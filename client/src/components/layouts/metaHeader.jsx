import React from "react";
import {Helmet} from "react-helmet";

const MetaHeader = () => {
    return (
        <Helmet>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="author" content="" />
            <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="images/favicons/apple-touch-icon.png"
            />
            <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="fimages/avicons/favicon-32x32.png"
            />
            <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="images/favicons/favicon-16x16.png"
            />
    
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        
            <link href="css/style.css" rel="stylesheet" />
        
            <link rel="canonical" href="http://fluxgift.com/" />
            
            <title>Fluxgift</title>
            <meta property="og:title" content="Fluxgift" />
            <meta property="og:locale" content="en_US" />
            <meta
            name="description"
            content="Send money across the world with a click of
            a button."
            />
            <meta
            property="og:description"
            content="Make your daily payments with crypto."
            />
            <meta name="twitter:card" content="summary"></meta>
            
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="" />
            <meta name="twitter:creator" content="" />
            <meta name="twitter:title" content="Fluxgift" />
            <meta name="twitter:description" content="Make your daily payments with crypto."/>
            
            <meta property="og:title" content="Fluxgift" />
            <meta property="og:url" content="fluxgift.com" />
            <meta property="og:image" content="images/og-image.png" />
            <meta property="og:description" content="Make your daily payments with crypto."/>
            <meta property="og:locale" content="en_GB" />
            <meta property="og:type" content="Application" />
            
            <link rel="canonical" href="fluxgift.com" />
            <meta property="og:url" content="fluxgift.com" />
            <meta property="og:site_name" content="Fluxgift" />
            <meta property="og:image" content="images/logo.svg" />
            <script type="application/ld+json">
            {`
                "description": "Send money across the world with a click of
                a button.",
                "headline": "Fluxgift",
                "@type": "WebSite",
                "url": "http://fluxgift.com",
                "name": "Fluxgift",
                "@context": "http://schema.org" `
            }
            </script>
        </Helmet>
    )
}

export default MetaHeader;