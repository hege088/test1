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
                this.calcRandomNumbers(num);
            }
            else {
                alert("Number should between 1 and 1024")
            }
        }
    }

    onClickNexusArtifakts(artifactId, groupId, packaging, $event) {
        if ($event instanceof MouseEvent) {
            this.calcNexusArtifakts(artifactId, groupId, packaging);
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

    calcRandomNumbers(num) {
        HTTP.call("GET", "https://qrng.anu.edu.au/API/jsonI.php?length=" + num + "&type=uint8",
            function(error, result) {
                if (!error) {
                    Session.set("resRandomNumbers", result.content);
                }
            });
    }

    calcNexusArtifakts(artifactId, groupId, packaging) {
        HTTP.call("GET", "https://nexus.faktorzehn.at/nexus/service/local/data_index", {
            headers: {
                "Accept": "application/json"
            },
            params: {
                "a": artifactId,
                "g": groupId,
                "p": packaging
            }
        },
            function(error, result) {
                if (!error) {
                    Session.set("resNexusArtifakts", result.content);
                }
            });
    }

    getIP(): string {
        var resIP = Session.get('resIP');
        if (resIP != null)
            return JSON.parse(resIP).ip;
    }

    getRandomNumbers(): Array<string> {
        var resRandomNumbers = Session.get('resRandomNumbers');
        if (resRandomNumbers != null)
            return JSON.parse(resRandomNumbers).data;
    }

    getNexusArtifakts() {
        var resNexusArtifakts = Session.get('resNexusArtifakts');
        if (resNexusArtifakts != null) {
            return JSON.parse(resNexusArtifakts).data;
        }
    }

}


bootstrap(RestAPIs);
