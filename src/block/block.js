/**
 * BLOCK: tour-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Panel, PanelBody, PanelRow, DateTimePicker, Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-tour-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tour Block' ), // Block title.
	icon: 'location', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		title: {
		  source: 'text',
		  selector: '.tour__title'
		},
		date: {
		  source: 'text',
		  selector: '.tour__date'
		},
		body: {
		  type: 'array',
		  source: 'children',
		  selector: '.tour__body'
		},
		tourUrl: {
		  source: 'text',
		  selector: '.tour__url'
		},
		imageAlt: {
		  attribute: 'alt',
		  selector: '.tour__image'
		},
		imageUrl: {
		  attribute: 'src',
		  selector: '.tour__image'
		}
	  },
	keywords: [
		__( 'tour-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit({ attributes, className, setAttributes }) {

		const getImageButton = (openEvent) => {
		  if(attributes.imageUrl) {
			return (
			  <img 
				src={ attributes.imageUrl }
				onClick={ openEvent }
				className="image"
			  />
			);
		  }
		  else {
			return (
			  <div className="button-container">
				<Button 
				  onClick={ openEvent }
				  className="button button-large"
				>
				  Pick an image
				</Button>
			  </div>
			);
		  }
		};
	
		return (
		  <div className="container">
			<MediaUpload
			  onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
			  type="image"
			  value={ attributes.imageID }
			  render={ ({ open }) => getImageButton(open) }
			/>			
			<PlainText
			  onChange={ content => setAttributes({ date: content }) }
			  value={ attributes.date }
			  placeholder="Your tour date"
			  className="date"
			/>
			<PlainText
			  onChange={ content => setAttributes({ title: content }) }
			  value={ attributes.title }
			  placeholder="Your tour title"
			  className="heading"
			/>
			<RichText
			  onChange={ content => setAttributes({ body: content }) }
			  value={ attributes.body }
			  multiline="p"
			  placeholder="Your tour text"
			  isSelected={ attributes.isSelected }
			/>
			<PlainText
			  onChange={ content => setAttributes({ tourUrl: content }) }
			  value={ attributes.tourUrl }
			  placeholder="Your tour url"
			  className="toururl"
			/>
		  </div>
		);
	
	  },
	
	  save({ attributes }) {
	
		const tourImage = (src, alt) => {
		  if(!src) return null;
	
		  if(alt) {
			return (
			  <img 
				className="tour__image" 
				src={ src }
				alt={ alt }
			  /> 
			);
		  }
		  
		  // No alt set, so let's hide it from screen readers
		  return (
			<img 
			  className="tour__image" 
			  src={ src }
			  alt=""
			  aria-hidden="true"
			/> 
		  );
		};
		
		return (
		  <div className="tour">
			{ tourImage(attributes.imageUrl, attributes.imageAlt) }
			<div className="tour__content">
			  <div className="tour__date">{ attributes.date }</div>
			  <h3 className="tour__title">{ attributes.title }</h3>
			  <div className="tour__body">
				{ attributes.body }
			  </div>
			  <div className="tour__url"><a className="tour__btn" href="{ attributes.tourUrl }">Tickets</a></div>
			</div>
		  </div>
		);
	  }
	});