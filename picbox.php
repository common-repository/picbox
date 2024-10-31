<?php
/*
Plugin Name: Picbox
Plugin URI: http://bunnyfire.co.uk/projects/picbox/
Feed URI: 
Description: Incredibly sexy image overlays using Picbox v2.2.
Version: 1.2
Author: Ben Kay
Author URI: http://bunnyfire.co.uk/
*/

$picbox_version = '2.2';

///
/// Actions/Filters
///

add_action('init', 'add_picbox');
add_action('wp_head', 'add_picbox_activation', 10);
if (get_option('picbox_autoactivate')) {
	add_filter('the_content', 'picbox_auto', 99);
	add_filter('the_excerpt', 'picbox_auto', 99);
}
add_action('admin_menu', 'picbox_admin');
register_activation_hook(__FILE__, 'picbox_activation');


///
/// Page functions
///
function add_picbox() {
	if (!is_admin()) {
		$plugin_path =  WP_PLUGIN_URL .'/'. plugin_basename(dirname(__FILE__));
		wp_enqueue_script('picbox', $plugin_path .'/js/picbox.js', array('jquery'), $picbox_version);
		wp_enqueue_style('picbox', $plugin_path .'/css/picbox.css');
	}
}

function add_picbox_activation() {
	if (!is_admin()) {
		$rel_text = get_option('picbox_activate_text');
		$loop = get_option('picbox_loop') ? 'true' : 'false';
		$flash = get_option('picbox_flash') ? 'true' : 'false';
		$margins = get_option('picbox_margins');
?>
<!-- Picbox v<?php echo $picbox_version ?> | http://bunnyfire.co.uk/projects/picbox/ -->
<script type="text/javascript">
// <![CDATA[
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
	jQuery(function($) {
		$("a[rel^='<?php echo $rel_text ?>']").picbox({loop:<?php echo $loop?>,
													   hideFlash:<?php echo $flash?>,
													   margins:<?php echo $margins?> },
		function(el) {
			return [el.href, el.title || el.childNodes[0].title || el.childNodes[0].alt || ""];
		},
		function(el) {
			return (this == el) || ((this.rel.length > <?php echo strlen($rel_text) ?>) && (this.rel == el.rel));
		});
	});
}
// ]]>
</script>
<!-- /Picbox -->
<?php
	}
}

function picbox_auto($content) {
	global $post;
	
	$rel_text = get_option('picbox_activate_text');
	$pattern = "/<a(.*?)href=('|\")([A-Za-z0-9\/_\.\~\:-]*?)(\.bmp|\.gif|\.jpg|\.jpeg|\.png)('|\")([^\>]*?)>/i";
	$replacement = '<a$1href=$2$3$4$5$6 rel="'.$rel_text.'-'.$post->ID.'">';
	$content = preg_replace($pattern, $replacement, $content);
	return $content;
}

///
/// Misc
///

function picbox_activation() {

		add_option('picbox_activate_text', "lightbox");
		add_option('picbox_autoactivate', True);
		add_option('picbox_loop', False);
		add_option('picbox_flash', True);
		add_option('picbox_margins', 0);

}

function picbox_restore_settings() {

		update_option('picbox_activate_text', "lightbox");
		update_option('picbox_autoactivate', True);
		update_option('picbox_loop', False);
		update_option('picbox_flash', True);
		update_option('picbox_margins', 0);

}


///
/// Admin panel functions
///

function picbox_admin() {
  add_options_page('Picbox options', 'Picbox', 'manage_options', __FILE__, 'picbox_admin_page');
}

function picbox_admin_page() {
	
	// update options if needed
	if ($_POST['restore']) {
		picbox_restore_settings(True);
	}
	else if ($_POST['save']) {
	
		if ($_POST['pb_activate_text'] || '0' === $_POST['pb_activate_text'] )
			update_option('picbox_activate_text', $_POST['pb_activate_text']);
			
		if (true == $_POST['pb_autoactivate'])
			update_option('picbox_autoactivate', True);
		else 
			update_option('picbox_autoactivate', False);
			
		
		if (true == $_POST['pb_loop'])
			update_option('picbox_loop', True);
		else 
			update_option('picbox_loop', False);
			
		if (true == $_POST['pb_flash'])
			update_option('picbox_flash', True);
		else 
			update_option('picbox_flash', False);
		
		if ($_POST['pb_margins'] || '0' === $_POST['pb_margins'])
			if (is_numeric($_POST['pb_margins']))
				update_option('picbox_margins', $_POST['pb_margins']);
			else
				$error = "Margins must be a number";
			
	}
	
	$rel_text = get_option('picbox_activate_text');
	$autoactivate = get_option('picbox_autoactivate');
	$loop = get_option('picbox_loop');
	$flash = get_option('picbox_flash');
	$margins = get_option('picbox_margins');
?>
<div class="wrap">
	<h2>Picbox options</h2>
	<form action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">
		<?php if($error) : ?>
			<p class="error"><?php echo $error; ?></p>
		<?php endif; ?>
		<table class="form-table">
			<tr valign="top">
				<th scope="row">Activation:</th>
				<td>
					Picbox will activate only on image links containing the rel="something" attribute.<br />
					<input type="text" id="pb_activate_text" name="pb_activate_text" value="<?php echo $rel_text ?>" /><label for="pb_activate_text"> rel text to activate picbox</label><br /><br />
					Automatically activate picbox on all image links in posts. Images will be grouped with others in the same post.<br />
					<input type="checkbox" id="pb_autoactivate" name="pb_autoactivate" <?php echo $autoactivate ? 'checked="checked"' : '' ?> /><label for="pb_autoactivate"> Automatically add rel="<?php echo $rel_text ?>-post_id"</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">Other Settings:</th>
				<td>
					<input type="checkbox" id="pb_loop" name="pb_loop" <?php echo $loop ? 'checked="checked"' : '' ?> /><label for="pb_loop"> loop between first and last images</label><br /><br  />
					By default flash is hidden when picbox is activated. Read <a href="http://kb2.adobe.com/cps/155/tn_15523.html">this</a> before disabling.<br />
					<input type="checkbox" id="pb_flash" name="pb_flash" <?php echo $flash ? 'checked="checked"' : '' ?> /><label for="pb_flash"> hide flash on page</label><br /><br />
					Use this to adjust how close the edges of the image come to the edge of the page.<br />
					<input type="text" id="pb_margins" name="pb_margins" style="width: 3em" value="<?php echo $margins ?>" /><label for="pb_margins">px margins at edge of image</label>
				</td>
			</tr>
			<tr>
				<td>
					<span class="submit"><input name="save" value="Save" type="submit" /></span>
					<span class="submit"><input name="restore" value="Restore defaults" type="submit"/></span>
				</td>
			</tr>
		</table>
	</form>
</div>
<?php
}

?>
