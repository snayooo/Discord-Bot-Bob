import { createCommandConfig } from "robo.js";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const config = createCommandConfig({
    description: 'Upload a sound.',
    options: [
        {
            name: 'sound',
            description: 'The sound file to upload',
            type: 'attachment',
            required: true
        }
    ]
});
export default (async (interaction)=>{
    await interaction.deferReply({
        ephemeral: true
    });
    return interaction.editReply("Command currently not working. It is in development.");
    const soundFile = interaction.options.getAttachment('sound');
    if (!soundFile) {
        return interaction.editReply({
            content: 'Please provide a sound file to upload.'
        });
    }
    console.log(soundFile.url);
    try {
        // Download the file
        const res = await fetch(soundFile.url);
        if (!res.ok) {
            throw new Error(`Failed to fetch file: ${res.statusText}`);
        }
        // Create the sounds directory if it doesn't exist
        const soundsDir = path.join(__dirname, '../../sounds');
        if (!fs.existsSync(soundsDir)) {
            fs.mkdirSync(soundsDir, {
                recursive: true
            });
        }
        // Generate file path
        const fileName = soundFile.name;
        const filePath = path.join(soundsDir, fileName);
        // Check if file already exists
        if (fs.existsSync(filePath)) {
            return interaction.editReply({
                content: `Sound file ${fileName} already exists!`
            });
        }
        // Create write stream and download file
        const fileStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject)=>{
            res.body.pipe(fileStream);
            res.body.on('error', reject);
            fileStream.on('finish', ()=>resolve());
            fileStream.on('error', reject);
        });
        console.log(`File saved to: ${filePath}`);
    } catch (error) {
        console.error(error);
        return interaction.editReply({
            content: 'Failed to upload sound file.'
        });
    }
    await interaction.editReply({
        content: `Sound file ${soundFile.name} uploaded successfully!`
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFx1cGxvYWRcXHNvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbiB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgeyBjbGllbnQsIGNyZWF0ZUNvbW1hbmRDb25maWcgfSBmcm9tICdyb2JvLmpzJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcblxyXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcbiAgICBkZXNjcmlwdGlvbjogJ1VwbG9hZCBhIHNvdW5kLicsXHJcbiAgICBvcHRpb25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnc291bmQnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzb3VuZCBmaWxlIHRvIHVwbG9hZCcsXHJcbiAgICAgICAgICAgIHR5cGU6ICdhdHRhY2htZW50JyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0gYXMgY29uc3QpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoaW50ZXJhY3Rpb246IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbikgPT4ge1xyXG4gICAgYXdhaXQgaW50ZXJhY3Rpb24uZGVmZXJSZXBseSh7IGVwaGVtZXJhbDogdHJ1ZSB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseShcIkNvbW1hbmQgY3VycmVudGx5IG5vdCB3b3JraW5nLiBJdCBpcyBpbiBkZXZlbG9wbWVudC5cIik7XHJcbiAgICBcclxuICAgIGNvbnN0IHNvdW5kRmlsZSA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0QXR0YWNobWVudCgnc291bmQnKTtcclxuXHJcbiAgICBcclxuICAgIGlmICghc291bmRGaWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdQbGVhc2UgcHJvdmlkZSBhIHNvdW5kIGZpbGUgdG8gdXBsb2FkLidcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhzb3VuZEZpbGUudXJsKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIERvd25sb2FkIHRoZSBmaWxlXHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goc291bmRGaWxlLnVybCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggZmlsZTogJHtyZXMuc3RhdHVzVGV4dH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgc291bmRzIGRpcmVjdG9yeSBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcbiAgICAgICAgY29uc3Qgc291bmRzRGlyID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3NvdW5kcycpO1xyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhzb3VuZHNEaXIpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhzb3VuZHNEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgZmlsZSBwYXRoXHJcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBzb3VuZEZpbGUubmFtZTtcclxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihzb3VuZHNEaXIsIGZpbGVOYW1lKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZmlsZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGBTb3VuZCBmaWxlICR7ZmlsZU5hbWV9IGFscmVhZHkgZXhpc3RzIWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgd3JpdGUgc3RyZWFtIGFuZCBkb3dubG9hZCBmaWxlXHJcbiAgICAgICAgY29uc3QgZmlsZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVQYXRoKTtcclxuICAgICAgICBcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlcy5ib2R5LnBpcGUoZmlsZVN0cmVhbSk7XHJcbiAgICAgICAgICAgIHJlcy5ib2R5Lm9uKCdlcnJvcicsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIGZpbGVTdHJlYW0ub24oJ2ZpbmlzaCcsICgpID0+IHJlc29sdmUoKSk7XHJcbiAgICAgICAgICAgIGZpbGVTdHJlYW0ub24oJ2Vycm9yJywgcmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYEZpbGUgc2F2ZWQgdG86ICR7ZmlsZVBhdGh9YCk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgY29udGVudDogJ0ZhaWxlZCB0byB1cGxvYWQgc291bmQgZmlsZS4nXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICBjb250ZW50OiBgU291bmQgZmlsZSAke3NvdW5kRmlsZS5uYW1lfSB1cGxvYWRlZCBzdWNjZXNzZnVsbHkhYFxyXG4gICAgfSk7XHJcbn07Il0sIm5hbWVzIjpbImNyZWF0ZUNvbW1hbmRDb25maWciLCJmcyIsImZldGNoIiwicGF0aCIsImZpbGVVUkxUb1BhdGgiLCJfX2ZpbGVuYW1lIiwidXJsIiwiX19kaXJuYW1lIiwiZGlybmFtZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsIm5hbWUiLCJ0eXBlIiwicmVxdWlyZWQiLCJpbnRlcmFjdGlvbiIsImRlZmVyUmVwbHkiLCJlcGhlbWVyYWwiLCJlZGl0UmVwbHkiLCJzb3VuZEZpbGUiLCJnZXRBdHRhY2htZW50IiwiY29udGVudCIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJvayIsIkVycm9yIiwic3RhdHVzVGV4dCIsInNvdW5kc0RpciIsImpvaW4iLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiZmlsZU5hbWUiLCJmaWxlUGF0aCIsImZpbGVTdHJlYW0iLCJjcmVhdGVXcml0ZVN0cmVhbSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYm9keSIsInBpcGUiLCJvbiIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFpQkEsbUJBQW1CLFFBQVEsVUFBVTtBQUN0RCxPQUFPQyxRQUFRLEtBQUs7QUFDcEIsT0FBT0MsV0FBVyxhQUFhO0FBQy9CLE9BQU9DLFVBQVUsT0FBTztBQUN4QixTQUFTQyxhQUFhLFFBQVEsTUFBTTtBQUVwQyxNQUFNQyxhQUFhRCxjQUFjLFlBQVlFLEdBQUc7QUFDaEQsTUFBTUMsWUFBWUosS0FBS0ssT0FBTyxDQUFDSDtBQUUvQixPQUFPLE1BQU1JLFNBQVNULG9CQUFvQjtJQUN0Q1UsYUFBYTtJQUNiQyxTQUFTO1FBQ0w7WUFDSUMsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNkO0tBQ0g7QUFDTCxHQUFXO0FBRVgsZUFBZSxDQUFBLE9BQU9DO0lBQ2xCLE1BQU1BLFlBQVlDLFVBQVUsQ0FBQztRQUFFQyxXQUFXO0lBQUs7SUFFL0MsT0FBT0YsWUFBWUcsU0FBUyxDQUFDO0lBRTdCLE1BQU1DLFlBQVlKLFlBQVlKLE9BQU8sQ0FBQ1MsYUFBYSxDQUFDO0lBR3BELElBQUksQ0FBQ0QsV0FBVztRQUNaLE9BQU9KLFlBQVlHLFNBQVMsQ0FBQztZQUN6QkcsU0FBUztRQUNiO0lBQ0o7SUFFQUMsUUFBUUMsR0FBRyxDQUFDSixVQUFVYixHQUFHO0lBRXpCLElBQUk7UUFDQSxvQkFBb0I7UUFDcEIsTUFBTWtCLE1BQU0sTUFBTXRCLE1BQU1pQixVQUFVYixHQUFHO1FBRXJDLElBQUksQ0FBQ2tCLElBQUlDLEVBQUUsRUFBRTtZQUNULE1BQU0sSUFBSUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFRixJQUFJRyxVQUFVLEVBQUU7UUFDN0Q7UUFFQSxrREFBa0Q7UUFDbEQsTUFBTUMsWUFBWXpCLEtBQUswQixJQUFJLENBQUN0QixXQUFXO1FBQ3ZDLElBQUksQ0FBQ04sR0FBRzZCLFVBQVUsQ0FBQ0YsWUFBWTtZQUMzQjNCLEdBQUc4QixTQUFTLENBQUNILFdBQVc7Z0JBQUVJLFdBQVc7WUFBSztRQUM5QztRQUVBLHFCQUFxQjtRQUNyQixNQUFNQyxXQUFXZCxVQUFVUCxJQUFJO1FBQy9CLE1BQU1zQixXQUFXL0IsS0FBSzBCLElBQUksQ0FBQ0QsV0FBV0s7UUFFdEMsK0JBQStCO1FBQy9CLElBQUloQyxHQUFHNkIsVUFBVSxDQUFDSSxXQUFXO1lBQ3pCLE9BQU9uQixZQUFZRyxTQUFTLENBQUM7Z0JBQ3pCRyxTQUFTLENBQUMsV0FBVyxFQUFFWSxTQUFTLGdCQUFnQixDQUFDO1lBQ3JEO1FBQ0o7UUFFQSx3Q0FBd0M7UUFDeEMsTUFBTUUsYUFBYWxDLEdBQUdtQyxpQkFBaUIsQ0FBQ0Y7UUFFeEMsTUFBTSxJQUFJRyxRQUFjLENBQUNDLFNBQVNDO1lBQzlCZixJQUFJZ0IsSUFBSSxDQUFDQyxJQUFJLENBQUNOO1lBQ2RYLElBQUlnQixJQUFJLENBQUNFLEVBQUUsQ0FBQyxTQUFTSDtZQUNyQkosV0FBV08sRUFBRSxDQUFDLFVBQVUsSUFBTUo7WUFDOUJILFdBQVdPLEVBQUUsQ0FBQyxTQUFTSDtRQUMzQjtRQUVBakIsUUFBUUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFVyxVQUFVO0lBRTVDLEVBQUUsT0FBT1MsT0FBTztRQUNackIsUUFBUXFCLEtBQUssQ0FBQ0E7UUFDZCxPQUFPNUIsWUFBWUcsU0FBUyxDQUFDO1lBQ3pCRyxTQUFTO1FBQ2I7SUFDSjtJQUVBLE1BQU1OLFlBQVlHLFNBQVMsQ0FBQztRQUN4QkcsU0FBUyxDQUFDLFdBQVcsRUFBRUYsVUFBVVAsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2xFO0FBQ0osQ0FBQSxFQUFFIn0=