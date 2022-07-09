import ghpages from 'gh-pages';
import dotenv from 'dotenv'
dotenv.config()

ghpages.publish(
    'dist',
    {
        branch: 'pages',
        silent: true,
        repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/mavthedev/height-calculator.git',
        user: {
            name: 'mavBot',
            email: 'redragercj@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)