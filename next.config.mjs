/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'b.thumbs.redditmedia.com',
    //         port: '',
    //         pathname: '/**',
    //       },
    //     ],
    //   },
    images: {
        domains: ["a.thumbs.redditmedia.com","b.thumbs.redditmedia.com","external-preview.redd.it","preview.redd.it","docs.google.com","i.redd.it","v.redd.it","i.imgur.com","i.imgflip.com"],
      },
};

export default nextConfig;
