import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2-meteor';

@Component({
    selector: 'app'
})
@View({
    templateUrl: 'client/app.html'
})
class RestAPIs {

    onClickIP($event) {
        if ($event instanceof MouseEvent) {
            this.calcIP();
        }
    }

    onClickRandomNumber(num, $event) {
        if ($event instanceof MouseEvent) {
            if (num >= 1 && num <= 1024) {
                this.calcRandomNumber(num);
            }
            else {
                alert("Number should between 1 and 1024")
            }

        }
    }

    calcIP() {
        HTTP.call("GET", "http://jsonip.com/",
            function(error, result) {
                if (!error) {
                    Session.set("resIP", result.content);
                }
            });
    }

    calcRandomNumber(num) {
        HTTP.call("GET", "https://qrng.anu.edu.au/API/jsonI.php?length=" + num + "&type=uint8",
            function(error, result) {
                if (!error) {
                    Session.set("resRandomNumber", result.content);
                }
            });
    }

    getIP(): string {
        if (Session.get('resIP') != null)
            return JSON.parse(Session.get('resIP')).ip;
    }

    getRandomNumbers(): Array<string> {
        if (Session.get('resRandomNumber') != null)
            return JSON.parse(Session.get('resRandomNumber')).data;
    }


}


bootstrap(RestAPIs);
