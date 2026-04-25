import { registerBlockType } from '@wordpress/blocks';
import { BlockControls, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup, TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';


export default function Edit({ attributes, setAttributes }) {
        const { item } = attributes;

        const blockProps = useBlockProps();

        // Predefined icons
        const iconOptions = [
            { label: 'Facebook', value: 'facebook', 'img': 'http://recipes.staging/wp-content/themes/lw-recipes/assets/img/fb.svg' },
            { label: 'Instagram', value: 'instagram', 'img': 'http://recipes.staging/wp-content/themes/lw-recipes/assets/img/instagram.svg' },
            { label: 'LinkedIn', value: 'linkedin', 'img': 'http://recipes.staging/wp-content/themes/lw-recipes/assets/img/linked-in.svg'},
            { label: 'YouTube', value: 'youtube', 'img': 'http://recipes.staging/wp-content/themes/lw-recipes/assets/img/youtube.svg'}
        ];

    // Function to handle icon change
    const handleIconChange = (newIcon) => {
        // Only update if the icon is different
            setAttributes({
                item: {
                    ...item, // Spread the current item to retain other properties
                    icon: newIcon, // Update only the icon property
                },
            });
    };

    const handleSiteChange = (newSite) => {
        setAttributes({
            item: {
                ...item,
                site: newSite, // Update only the site, keep icon intact
            },
        });
    };

    // Function to get the img URL based on a value
    const getIconImage = (value) => {
    // Find the icon object where the value matches
    const icon = iconOptions.find(option => option.value === value);
    
    // If a matching icon is found, return the img URL
    if (icon) {
        return icon.img;
    } else {
        return 'No icon found.';
    }
    };


        return (
            <div { ...useBlockProps()}>
                <InspectorControls key="setting">
                    <PanelBody title={__('Social Media Item', 'lw-recipes')}>
                        <TextControl label={__('Website Link', 'lw-recipes')} value={item.site ? item.site : ''} onChange={handleSiteChange} />
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                <ToolbarGroup>
                        {iconOptions.map((iconOption) => (
                        <ToolbarButton
                            label={iconOption.label}
                            onClick={() => handleIconChange(iconOption.value)}
                            isActive={item.icon === iconOption.value} 
                        >
                        <img src={iconOption.img} />
                        </ToolbarButton>
                    ))}
                </ToolbarGroup>
                </BlockControls>

                   {item.site && item.icon ? (
                <p>
                    {/* Render the icon image if both site and icon are present */}
                    {getIconImage(item.icon) !== 'No icon found.' ? (
                        <img
                            src={getIconImage(item.icon)}
                            alt={item.icon}
                        />
                    ) : (
                        <span>{__('No icon found.', 'lw-recipes')}</span>  // Fallback if no icon is found
                    )}
                </p>
            ) : (
                <p>{__('Please add both an icon image and website.', 'lw-recipes')}</p>
            )}
            </div>
        );
}


