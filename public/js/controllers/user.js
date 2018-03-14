criveAssign.controller("criveController", function ($http, $scope) {
    $scope.user = {
        addressline1: '',
        addressline2: '',
        state: '',
        country: '',
        zipcode: '',
        profileimage: '',
        name: '',
        gender: '',
        zipType: 'zip',
        invalidPin: false
    }


    $scope.isLoggedIn = function () {

        if (localStorage.getItem('access_token') && $scope.user.name != '')
            return true
        else
            return false
    }


    $scope.validateZipCode = function () {

        let strring = ''
        strring = ($scope.user.zipcode)
        let regEx = new RegExp("[0-9]")
        if (!regEx.test(strring.charAt(strring.length - 1)) || strring.length > 6) {
            strring = $scope.user.zipcode = strring.slice(0, -1)
        }

        if (strring.length < 5)

            $scope.user.invalidPin = true

        else if (strring.length == 5 && $scope.user.zipType == 'pin')

            $scope.user.invalidPin = true
        else if (strring.length == 6 && $scope.user.zipType == 'zip')
            $scope.user.invalidPin = true
        else
            $scope.user.invalidPin = false
    }


    $scope.checkCountry = function () {
        if ($scope.user.country == 'India')
            $scope.user.zipType = 'pin'
        else
            $scope.user.zipType = 'zip'

        return $scope.user.zipType;
    }





    $scope.loginWithFb = function (response) {


        if (response.status != "connected" || !response.authResponse.accessToken) {

            Materialize.toast("Error In Logging in facebook", 2000);
            return;

        }

        $http({

            method: "POST",
            url: "api/loginWithFb",
            data: {

                access_token: response.authResponse.accessToken

            }

        }).then(function successCallBack(userData) {

            Materialize.toast("Successfully Logged In!", 2000);
            // $scope.message = "";
            // $scope.loadMessages();
            console.log("The user datat is ==>" + JSON.stringify(userData))
            $scope.user.name = userData['data']['user']['profile']['displayName']

            $scope.user.gender = userData['data']['user']['profile']['gender']

            $scope.user.profileimage = userData['data']['user']['profile']['photos'][0]['value']

            localStorage.setItem('access_token', response.authResponse.accessToken)

            if (userData['data']['user']['user']['address']['zipCode'] != null) {

                $scope.user.addressline1 = userData['data']['user']['user']['address']['line1']

                $scope.user.addressline2 = userData['data']['user']['user']['address']['line2']

                $scope.user.state = userData['data']['user']['user']['address']['state']

                $scope.user.country = userData['data']['user']['user']['address']['country']

                $scope.user.zipcode = userData['data']['user']['user']['address']['zipCode']
            }

        }, function errorCallBack(response) {

            if (response.msg) {

                Materialize.toast(response.msg, 5000);

            }

            // console.log(error);

        });
    }

    $scope.updateAddress = function () {

        if ($scope.user.invalidPin == true) {
            alert("The zip code is not valid")
            return
        }
        $scope.user.state = document.getElementById("state").value;

        console.log("Address Line1:==>" + $scope.user.addressline1)
        console.log("Address Line2:==>" + $scope.user.addressline2)
        console.log("State:==>" + $scope.user.state)
        console.log("Country:==>" + $scope.user.country)
        console.log("ZipCode:==>" + $scope.user.zipcode)

        $http({

            method: "POST",
            url: "api/updateAddress",
            data: {

                access_token: localStorage.getItem('access_token'),

                addL1: $scope.user.addressline1,

                addL2: $scope.user.addressline2,

                state: $scope.user.state,

                country: $scope.user.country,

                zipCode: parseInt($scope.user.zipcode)

            }

        }).then(function successCallBack(userData) {

            Materialize.toast("Successfully Updates Address In!", 2000);
            // $scope.message = "";
            // $scope.loadMessages();
            console.log("The user datat is ==>" + JSON.stringify(userData))


        }, function errorCallBack(response) {

            if (response['data']['msg']) {

                Materialize.toast(response['data']['msg'], 5000);

            }

            // console.log(error);

        });

    }

});

