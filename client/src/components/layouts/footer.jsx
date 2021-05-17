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
    <section className="footer">
        <div className="container">
            <div className="alignment">
            <div className="footer__copy">
                <h4>fluxgift.</h4>
                <p className="mt-10">
                Buy gift cards for anything under the sun. No account necessary.
                </p>
                <p className="made">
                2021 Fluxgift. All rights reserved
                </p>
            </div>
            <div className="footer__links">
            {links && links.map((link, i) => 
                <ul key={i} className="footer__links-set">
                    <li className="footer__links-set__head">
                        {link.title }
                    </li>
                    {link.links.map((href, m) => 
                    <li key={m} className="mb-6 clickable">
                        { href }
                    </li>)}
                </ul>
            )}
            </div>
            </div>
        </div>
    </section>
    )
}

export default Footer;