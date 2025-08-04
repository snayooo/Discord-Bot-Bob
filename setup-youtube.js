import play from 'play-dl';

async function setupYouTube() {
    console.log('Setting up YouTube authentication for play-dl...');
    
    try {
        // Check if already authenticated
        if (!play.is_expired()) {
            console.log('✅ YouTube authentication is already valid!');
            return;
        }

        console.log('\n🔧 Setting up YouTube cookies...');
        console.log('Please follow these steps:');
        console.log('1. Go to youtube.com in your browser');
        console.log('2. Make sure you are logged in');
        console.log('3. Open Developer Tools (F12)');
        console.log('4. Go to Application/Storage tab');
        console.log('5. Click on Cookies > https://www.youtube.com');
        console.log('6. Copy the cookie values and paste them when prompted\n');

        // Set up YouTube cookies
        await play.setToken({
            youtube: {
                // This will prompt for manual cookie setup
                cookie: 'manual'
            }
        });

        console.log('✅ YouTube authentication setup complete!');
        
        // Test the setup
        console.log('🧪 Testing YouTube search...');
        const testSearch = await play.search('test song', { limit: 1 });
        if (testSearch.length > 0) {
            console.log('✅ YouTube search is working!');
            console.log(`Found: ${testSearch[0].title}`);
        } else {
            console.log('❌ YouTube search failed');
        }

    } catch (error) {
        console.error('❌ Error setting up YouTube:', error);
        console.log('\nAlternative: You can try using a different approach...');
    }
}

setupYouTube();
