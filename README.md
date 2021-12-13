# Frontend Mentor - IP address tracker

## Overview
Track Ip Address and locate them on the map 

### Screenshot

![](./screenshot.png)


### Links

- Solution URL: [IP Address Tracker](https://williamssam.github.io/ip-address-tracker/)


### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript

### What I learned

- I learnt how to work with map in Javascript by using the leafleat map
- With the help of a little bit of googling, I was able to format the Ip address in the correct format using regex and check it against the value of the input field
```js
 const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
```

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

### Chanllenges
- One of the challenge I faced with this project is resetting the map if another Ip address is supplied by the user. I was able to overcome this challenges with the code below:
```js
// resets the map div
if (L.DomUtil.get('map') !== undefined) {
      L.DomUtil.get('map')._leaflet_id = null;
    }
```

## Author

- Website - [Williams Samuel](https://williamssam.netlify.app/)
- Frontend Mentor - [@williamssam](https://www.frontendmentor.io/profile/williamssam)
