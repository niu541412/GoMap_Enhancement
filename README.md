# GoMap Enhancement

### **Bye, this script is not continued anymore due to the gomap.eu down and my departure from Europe.**

> [GoMap](https://gomap.eu) is a Real-time Pokémon Go map for Germany and Austria.

This script is designed to enhance the function of GoMap. It only works on the browsers which support userscripts.
- Desktop Devices：Chrome, Firefox, Opera etc. 
- Mobile Devices: Firefox, Yandex, Dolphin etc. for Android. iOS currently not supported.

Userscripts manager: [Tampermonkey](http://tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), etc.


## Features:

- Remove advertisement bar (with Adblock-like extensions better).
- Decorate the menu button and something else.
- Add a fullscreen button to OpenStreet Map.
- Add some quick settings on the menu.
- Notification.

## Notification Tips:

- You must make sure that the notification permission for this site of your browser is enabled.
- Notify or scan the list of Pokemon which is got from the list of Big icons in setting menu by default. If you still want to display small icons, click the button named small icon above. This script will remember the list once. Click this button again to be back to scan the big icons, of course, you must set these big icons again. XD
- Sound or vibration depends on your device and browser permission. (i.e.  vibration is usually only valid on mobile devices.)
- Two scanning method (get your position)
  1. Automatic position: get the position from the device, i.e. GPS on mobile devices,  however not accurate on desktop devices, so go to 
  2. Manually setting a fixed position, you can get the latitude and longitude by clicking a Pokemon icon which is close to your place on the map or from some websites, e.g. [this](https://www.gps-coordinates.org/). 
(This value is about 50.0, 10.0 in Germany.) 
- The size of the scanning area is similar to a circle whose radius value in the setting menu. Actually, the shape of the area required by the server is a square.

If you want to scan another place which is not your current position,  choose this method.

## Notes & Bugs

When you enable notification, this scripts will send a scan request of a small area every minute except that your device is a mobile phone or a tablet and is set to the auto positioning method, the latter is every 20s. (Meanwhile, GoMap itself sends the request every 10s.) Sometimes it will send the same notification twice or more, I have no idea currently, maybe it's not due to my script.
I'll add Raids Notification in updating.

I can't speak German,  so if you want to help to translate this script, send a post or an e-mail(niu541412@gmail.com, please in Chinese or English).
