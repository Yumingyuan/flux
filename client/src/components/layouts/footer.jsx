import React from 'react';

const links = [
    {
      title: 'Questions?',
      links: [
        'FAQ',
        'Contact Form',
        'Product Request',
        'Reviews',
        'Video Tutorials',
        'support@fluxgift.com'
      ]
    },
    {
      title: 'Social',
      links: [
        'Blog',
        'Twitter',
        'Telegram',
        'Facebook',
        'Reddit',
        'Instagram',
        'Enter Newsletter',
        'Press Resources'
      ]
    },
    {
      title: 'Live on crypto',
      links: [
        'Refill phones',
        'Lightning',
        'Gaming',
        'Travel',
        'Entertainment',
        'Shopping',
        'Rewards'
      ]
    },
    {
      title: 'Partners',
      links: ['SinzuApp', 'Refer-a-friend', 'Careers']
    },
    {
      title: 'Legal',
      links: ['Terms and Condition', 'Privacy Policy']
    }
]

const Footer = () => {
    return (
    <footer className="w-100 py-2">
      <div className="main-wrap mx-auto wrapper-x">
        <p className="nanotext">Copyright © 2021, Fluxgift.</p>
      </div>
    </footer>
    )
}

export default Footer;