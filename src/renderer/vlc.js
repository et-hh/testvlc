const koffi = require('koffi');

const lib = koffi.load('./libvlc.dll');

const libvlc_new = lib.stdcall('libvlc_new', 'void *', ['int32', 'char *']);
const libvlc_media_player_new = lib.stdcall('libvlc_media_player_new', 'void *', ['void *']);
const libvlc_media_new_path = lib.stdcall('libvlc_media_new_path', 'void *', ['void *', 'string']);
const libvlc_media_player_set_media = lib.stdcall('libvlc_media_player_set_media', 'void', [
  'void *',
  'void *',
]);
const libvlc_media_player_stop = lib.stdcall('libvlc_media_player_stop', 'void', ['void *']);
const libvlc_media_player_set_time = lib.stdcall('libvlc_media_player_set_time', 'void', [
  'void *',
  'longlong',
]);
const libvlc_media_player_play = lib.stdcall('libvlc_media_player_play', 'int32', ['void *']);
const libvlc_media_player_get_state = lib.stdcall('libvlc_media_player_get_state', 'uint32', [
  'void *',
]);

let vlc_ins;
let vlc_player;

const play = (url) => {
  return new Promise((res) => {
    if (!vlc_ins) {
      // @ts-ignore
      vlc_ins = libvlc_new(0, null);
      vlc_player = libvlc_media_player_new(vlc_ins);
    }

    const vlc_media = libvlc_media_new_path(vlc_ins, url);

    libvlc_media_player_set_media(vlc_player, vlc_media);

    libvlc_media_player_stop(vlc_player);
    libvlc_media_player_set_time(vlc_player, 0);
    libvlc_media_player_play(vlc_player);

    const poller = setInterval(function () {
      if (libvlc_media_player_get_state(vlc_player) === 6) {
        libvlc_media_player_stop(vlc_player);
        clearInterval(poller);
        res('true');
      }
    }, 500);
  });
};

document.getElementById("play").addEventListener('click', function() {
  play('./hexiao.mp3');
});
