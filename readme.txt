=== Picbox ===
Contributors: Ben Kay
Donate link: http://bunnyfire.co.uk/projects/picbox/
Tags: javascript, images, lightbox, slimbox, picbox
Requires at least: 2.7
Tested up to: 2.9.2
Stable tag: 1.2

Plugin used to overlay images on the current page is a sexy way.

== Description ==

This plugin uses Picbox to overlay images on the current page.
Picbox is a javascript image viewer that tries to be a bit nicer than all the other lightbox clones,
and is designed so it handles larger images with ease. It will automatically scale down images to the browser's
screen size, which can then be zoomed into and moved around.

[Plugin Homepage](http://bunnyfire.co.uk/projects/picbox/ "Plugin Homepage")

== Installation ==

1. Upload `picbox` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. By default the plugin detects any image links in a post and groups them into a set automatically
4. If you would like more control over the activation, look at the settings page.

NOTE: even with the default settings, the plugin will not affect any existing rel tags, so to override the default
      (for example to create a custom set within a post) add rel="lightbox-setname" to the link. 

[Plugin Homepage](http://bunnyfire.co.uk/projects/picbox/ "Plugin Homepage")

== Changelog ==

See [Plugin Homepage](http://bunnyfire.co.uk/projects/picbox/ "Plugin Homepage") for full changelog.

= 1.2 =
* Upgraded to Picbox v2.2
* Caption now appears briefly when navigating using the keyboard and controls are hidden
* Small empty square no longer appears when a caption is not present
* The plugin will now use the title or alt text of the image if the link title is not present (no longer have to edit link title in the advanced settings)

= 1.1.2 =
* Upgraded Picbox to v2.1.2
* Added ability to customise more options in settings

= 1.1.1 =
* Upgraded Picbox to v2.1.1
* Dragging bug fixed
* Controls won't disappear if the mouse is over them
* Controls won't appear on keyboard navigation
* Some other small bugs fixed
* Lowered plugin priority so should work with [gallery] shortcode

= 1.1.0.1 =
* Forgot a few files...

= 1.1 =
* Upgraded Picbox to v2.1: New design and added functionality!

= 1.0.2 =
* Upgraded Picbox to v2.0.3. Fixes Picbox not working on pages with flash content. 

= 1.0.1 =
* Upgraded Picbox to v2.0.2. This fixes a resize bug if the window is scrolled.

= 1.0 =
* Initial release
