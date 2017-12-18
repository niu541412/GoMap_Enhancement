# GoMap Enhancement

> [GoMap](https://gomap.eu) is a Real-time Pokémon Go map for Germany and Austria.

This script is designed to enhance the function of GoMap.
## Installation:
[Greasy Fork](https://greasyfork.org/scripts/33147)

## Features:

- Remove advertisement bar (with Adblock-like extensions better).
- Decorate menu button and something else.
- Add fullscreen button to OpenStreet Map.
- Add some quick settings in the menu.
- Notification.

## Notification Tips:

- You must make sure that the notification permission for this site of your browser is enabled.
- Notify or scan lists of Pokemon is get from the list of Big icons in setting menu.
- Sound or vibration depends on your device and browser permission. (i.e.  vibration is usually only valid on mobile devices.)
- Two scanning method (get your position)
  1. Automatic position: get the position from the device, i.e. GPS on mobile devices,  however not accurate on desktop devices, so go to 
  2. Manually setting a fixed position, you can get the latitude and longitude by clicking a Pokemon icon which is close to your place on the map or from some websites, e.g. [this](https://www.gps-coordinates.org/). 
(This value is about 50.0, 10.0 in Germany.) 
- The size of scanning area is similar to a circle which has the radius value in the setting menu. Actually, the shape of the area is a square.

If you want to scan another place which is not your current position,  choose this method.

## Notes & Bugs

When you enable notification, this scripts will send a scan request of a small area every minute. (Meanwhile, GoMap itself sends the request every 10s.) Sometimes it will send the same notification twice or more, I have no idea currently, maybe it's not due to my script.
I'll add Raids Notification in updating.

I can't speak German,  so if you want to help to translate this script, send a post or an e-mail(niu541412@gmail.com, please in Chinese or English).
