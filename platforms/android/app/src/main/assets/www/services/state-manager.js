app.service('userStateManager', [function() {

    var userState;
    return {
        saveUserState: function(state) {
            window.localStorage.setItem("userState", JSON.stringify(state));
        },
        updateUserState: function(newState) {
            log(newState);
            if (localStorage.userState) {
                var userState = JSON.parse(localStorage.userState);
                userState.profile = newState.profile;
                warn("Updated User State :");
                log(userState);
                window.localStorage.setItem("userState", JSON.stringify(userState));

            }
        },
        getCurrentUserState: function() {
            log(localStorage.userState);
            return JSON.parse(localStorage.userState);
        },
        isUserState: function() {
            var state = JSON.parse(localStorage.getItem("userState"));
            if (state && state.token) {
                return true;
            } else {
                return false;
            }
        },
        saveProfileState: function(profile) {
            warn("Saving Profile Data :");
            log(profile);
            window.localStorage.setItem("profileState", JSON.stringify(profile));

        },
        getProfileState: function() {
            if (localStorage.profileState) {
                return JSON.parse(localStorage.profileState);
            } else {
                return undefined;
            }

        }

    }
}])