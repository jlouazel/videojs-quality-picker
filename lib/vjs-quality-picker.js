import QualityPickerButton from './quality-picker-button';

function qualityPickerPlugin() {
    var player = this;
    var tech = this.tech_;

    let SUPPORTED_TRACKS = ["video", "audio", "subtitle"];
    let TRACK_CLASS = {
        video: 'vjs-icon-hd',
        audio: 'vjs-icon-cog',
        subtitle: 'vjs-icon-subtitles'
    };

    tech.on('loadedqualitydata', onQualityData);

    function onQualityData(event, {qualityData, qualitySwitchCallback}) {

        var fullscreenToggle = player.controlBar.getChild('fullscreenToggle');
        player.controlBar.removeChild(fullscreenToggle);

        for (var i=0; i < SUPPORTED_TRACKS.length; i++) {
            var track = SUPPORTED_TRACKS[i];
            var name = track + "PickerButton";
            // videojs.utils.toTitleCase
            name = name.charAt(0).toUpperCase() + name.slice(1);

            var qualityPickerButton = player.controlBar.getChild(name);
            if (qualityPickerButton) {
                qualityPickerButton.dispose();
                player.controlBar.removeChild(qualityPickerButton);
            }

            if (qualityData[track] && qualityData[track].length > 1) {
                qualityPickerButton = new QualityPickerButton(player, {name, qualityList: qualityData[track], qualitySwitchCallback, trackType: track});
                qualityPickerButton.addClass(TRACK_CLASS[track]);

                player.controlBar.addChild(qualityPickerButton);
            }
        }

        if (fullscreenToggle) {
            player.controlBar.addChild(fullscreenToggle);
        }
    }
}

videojs.plugin('qualityPickerPlugin', qualityPickerPlugin);
