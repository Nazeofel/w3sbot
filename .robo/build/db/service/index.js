import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import Database from "better-sqlite3";
const currentDir = dirname(fileURLToPath(import.meta.url));
const dbPath = join(currentDir, '../../../../database/database.db');
const db = new Database(dbPath, {
    fileMustExist: true
});
const dbService = {
    isModuleEnabled: async (name)=>{
        const query = db.prepare('SELECT * FROM Modules WHERE moduleName = ?').get(name);
        console.log(query);
        if (query.isEnabled === 1) return true;
        return false;
    },
    getAllModules: async ()=>{
        const query = db.prepare('SELECT * FROM Modules').all();
        return query;
    },
    setAuditLogChannel: async function(channelData) {
        try {
            db.exec('DELETE FROM AuditLogsChannel');
            const query = db.prepare('INSERT OR REPLACE INTO AuditLogsChannel (channelName, channelId) VALUES (?, ?)');
            query.run(channelData.channelName, channelData.channelId);
            return {
                code: 200
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return {
                code: 500
            };
        }
    },
    getAuditLogChannel: async function() {
        try {
            const query = db.prepare('SELECT * FROM AuditLogsChannel LIMIT 1').get();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            return {
                code: 500
            };
        }
    },
    setMediaChannel: async function(channelData) {
        try {
            db.exec('DELETE FROM MediaChannel');
            const query = db.prepare('INSERT OR REPLACE INTO MediaChannel (channelName, channelId) VALUES (?, ?)');
            query.run(channelData.channelName, channelData.channelId);
            return {
                code: 200,
                data: channelData
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return {
                code: 500
            };
        }
    },
    getMediaChannel: async function() {
        try {
            const query = db.prepare('SELECT * FROM MediaChannel LIMIT 1').get();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            return {
                code: 500
            };
        }
    },
    collectMessage: async function(message) {
        try {
            const query = db.prepare('INSERT INTO CollectedMessages (discordUserId, discordUsername, discordMessageId, content, category, embeds) VALUES (?, ?, ?, ?, ?, ?)');
            query.run(message.discordUserId, message.discordUsername, message.discordMessageId, message.content, message.category, message.embeds);
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    getCollectedMessage: async function(category) {
        try {
            let queryString = 'SELECT * FROM CollectedMessages';
            if (category) {
                queryString += `WHERE category = ${category}`;
            }
            const query = db.prepare(queryString).get();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    createQuotesInstance: async (data)=>{
        try {
            const query = db.prepare('INSERT INTO QuotesSettings (channelId, category, isRunning, cronId, cronHour) VALUES (?, ?, ?, ?, ?)');
            query.run(data.channelId, data.category, data.isRunning, data.cronId, data.cronHour);
            const instance = db.prepare('SELECT * FROM QuotesSettings WHERE category = ?').get(data.category);
            return {
                code: 200,
                data: instance
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    getQuotesInstance: async (category)=>{
        try {
            const query = db.prepare('SELECT * FROM QuotesSettings WHERE category = ?').get(category);
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    getAllQuotesInstances: async ()=>{
        try {
            const query = db.prepare('SELECT * FROM QuotesSettings').all();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    updateQuotesInstance: async (isRunning, category)=>{
        try {
            const query = db.prepare('UPDATE QuotesSettings SET isRunning = ? WHERE category = ?');
            query.run(isRunning, category);
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    deleteQuotesInstance: async (category)=>{
        try {
            const query = db.prepare('DELETE FROM QuotesSettings WHERE category = ?');
            query.run(category);
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    }
};
export default dbService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcY2Vsc2lcXERvY3VtZW50c1xcUHJvZ3JhbW1pbmdcXFdvcmtcXHRlc3RzXFx3M3Nib3RcXHNyY1xcZGJcXHNlcnZpY2VcXGluZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5kb3RlbnYuY29uZmlnKCk7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBqb2luLCBkaXJuYW1lIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XHJcbmltcG9ydCB7IENvbGxlY3RlZE1lc3NhZ2UsIENvbGxlY3RlZE1lc3NhZ2VDYXRlZ29yeSwgUXVvdGVJbnN0YW5jZSB9IGZyb20gJy4uLy4uL3R5cGVzL3R5cGVzJztcclxuXHJcbmNvbnN0IGN1cnJlbnREaXIgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XHJcbmNvbnN0IGRiUGF0aCA9IGpvaW4oY3VycmVudERpciwgJy4uLy4uLy4uLy4uL2RhdGFiYXNlL2RhdGFiYXNlLmRiJyk7XHJcblxyXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShkYlBhdGgsIHtcclxuICBmaWxlTXVzdEV4aXN0OiB0cnVlXHJcbn0pO1xyXG5cclxuY29uc3QgZGJTZXJ2aWNlID0ge1xyXG4gIGlzTW9kdWxlRW5hYmxlZDogYXN5bmMgKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBNb2R1bGVzIFdIRVJFIG1vZHVsZU5hbWUgPSA/JykuZ2V0KG5hbWUpO1xyXG4gICAgY29uc29sZS5sb2cocXVlcnkpXHJcbiAgICBpZiAocXVlcnkuaXNFbmFibGVkID09PSAxKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEFsbE1vZHVsZXM6IGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIE1vZHVsZXMnKS5hbGwoKVxyXG4gICAgICByZXR1cm4gcXVlcnk7XHJcbiAgfSxcclxuICBzZXRBdWRpdExvZ0NoYW5uZWw6IGFzeW5jIGZ1bmN0aW9uKGNoYW5uZWxEYXRhKSB7ICBcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLmV4ZWMoJ0RFTEVURSBGUk9NIEF1ZGl0TG9nc0NoYW5uZWwnKVxyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ0lOU0VSVCBPUiBSRVBMQUNFIElOVE8gQXVkaXRMb2dzQ2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkgVkFMVUVTICg/LCA/KScpO1xyXG4gICAgICBxdWVyeS5ydW4oY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUsIGNoYW5uZWxEYXRhLmNoYW5uZWxJZCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwXHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGV4ZWN1dGluZyBxdWVyeTonLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldEF1ZGl0TG9nQ2hhbm5lbDogYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gQXVkaXRMb2dzQ2hhbm5lbCBMSU1JVCAxJykuZ2V0KCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IHF1ZXJ5XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNldE1lZGlhQ2hhbm5lbDogYXN5bmMgZnVuY3Rpb24oY2hhbm5lbERhdGEpIHsgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuZXhlYygnREVMRVRFIEZST00gTWVkaWFDaGFubmVsJylcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIE1lZGlhQ2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkgVkFMVUVTICg/LCA/KScpO1xyXG4gICAgICBxdWVyeS5ydW4oY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUsIGNoYW5uZWxEYXRhLmNoYW5uZWxJZCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IGNoYW5uZWxEYXRhXHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGV4ZWN1dGluZyBxdWVyeTonLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldE1lZGlhQ2hhbm5lbDogYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gTWVkaWFDaGFubmVsIExJTUlUIDEnKS5nZXQoKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29sbGVjdE1lc3NhZ2U6IGFzeW5jIGZ1bmN0aW9uKG1lc3NhZ2U6IENvbGxlY3RlZE1lc3NhZ2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gQ29sbGVjdGVkTWVzc2FnZXMgKGRpc2NvcmRVc2VySWQsIGRpc2NvcmRVc2VybmFtZSwgZGlzY29yZE1lc3NhZ2VJZCwgY29udGVudCwgY2F0ZWdvcnksIGVtYmVkcykgVkFMVUVTICg/LCA/LCA/LCA/LCA/LCA/KScpO1xyXG4gICAgICBxdWVyeS5ydW4obWVzc2FnZS5kaXNjb3JkVXNlcklkLCBtZXNzYWdlLmRpc2NvcmRVc2VybmFtZSwgbWVzc2FnZS5kaXNjb3JkTWVzc2FnZUlkLCBtZXNzYWdlLmNvbnRlbnQsIG1lc3NhZ2UuY2F0ZWdvcnksIG1lc3NhZ2UuZW1iZWRzKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldENvbGxlY3RlZE1lc3NhZ2U6IGFzeW5jIGZ1bmN0aW9uKGNhdGVnb3J5PzogQ29sbGVjdGVkTWVzc2FnZUNhdGVnb3J5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgcXVlcnlTdHJpbmcgPSAnU0VMRUNUICogRlJPTSBDb2xsZWN0ZWRNZXNzYWdlcydcclxuICAgICAgaWYoY2F0ZWdvcnkpIHtcclxuICAgICAgICBxdWVyeVN0cmluZyArPSBgV0hFUkUgY2F0ZWdvcnkgPSAke2NhdGVnb3J5fWA7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKHF1ZXJ5U3RyaW5nKS5nZXQoKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZVF1b3Rlc0luc3RhbmNlOiBhc3luYyAoZGF0YTogUXVvdGVJbnN0YW5jZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBRdW90ZXNTZXR0aW5ncyAoY2hhbm5lbElkLCBjYXRlZ29yeSwgaXNSdW5uaW5nLCBjcm9uSWQsIGNyb25Ib3VyKSBWQUxVRVMgKD8sID8sID8sID8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihkYXRhLmNoYW5uZWxJZCwgZGF0YS5jYXRlZ29yeSwgZGF0YS5pc1J1bm5pbmcsIGRhdGEuY3JvbklkLCBkYXRhLmNyb25Ib3VyKTtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIFF1b3Rlc1NldHRpbmdzIFdIRVJFIGNhdGVnb3J5ID0gPycpLmdldChkYXRhLmNhdGVnb3J5KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogaW5zdGFuY2VcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldFF1b3Rlc0luc3RhbmNlOiBhc3luYyAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIFF1b3Rlc1NldHRpbmdzIFdIRVJFIGNhdGVnb3J5ID0gPycpLmdldChjYXRlZ29yeSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IHF1ZXJ5XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDUwMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRBbGxRdW90ZXNJbnN0YW5jZXM6IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBRdW90ZXNTZXR0aW5ncycpLmFsbCgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdXBkYXRlUXVvdGVzSW5zdGFuY2U6IGFzeW5jIChpc1J1bm5pbmc6IGJvb2xlYW4sIGNhdGVnb3J5OiBzdHJpbmcpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnVVBEQVRFIFF1b3Rlc1NldHRpbmdzIFNFVCBpc1J1bm5pbmcgPSA/IFdIRVJFIGNhdGVnb3J5ID0gPycpO1xyXG4gICAgICBxdWVyeS5ydW4oaXNSdW5uaW5nLCBjYXRlZ29yeSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IHF1ZXJ5XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDUwMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWxldGVRdW90ZXNJbnN0YW5jZTogYXN5bmMgKGNhdGVnb3J5OiBzdHJpbmcpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnREVMRVRFIEZST00gUXVvdGVzU2V0dGluZ3MgV0hFUkUgY2F0ZWdvcnkgPSA/Jyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihjYXRlZ29yeSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IHF1ZXJ5XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDUwMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGRiU2VydmljZTsiXSwibmFtZXMiOlsiZG90ZW52IiwiY29uZmlnIiwiZmlsZVVSTFRvUGF0aCIsImpvaW4iLCJkaXJuYW1lIiwiRGF0YWJhc2UiLCJjdXJyZW50RGlyIiwidXJsIiwiZGJQYXRoIiwiZGIiLCJmaWxlTXVzdEV4aXN0IiwiZGJTZXJ2aWNlIiwiaXNNb2R1bGVFbmFibGVkIiwibmFtZSIsInF1ZXJ5IiwicHJlcGFyZSIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJpc0VuYWJsZWQiLCJnZXRBbGxNb2R1bGVzIiwiYWxsIiwic2V0QXVkaXRMb2dDaGFubmVsIiwiY2hhbm5lbERhdGEiLCJleGVjIiwicnVuIiwiY2hhbm5lbE5hbWUiLCJjaGFubmVsSWQiLCJjb2RlIiwiZXJyb3IiLCJnZXRBdWRpdExvZ0NoYW5uZWwiLCJkYXRhIiwic2V0TWVkaWFDaGFubmVsIiwiZ2V0TWVkaWFDaGFubmVsIiwiY29sbGVjdE1lc3NhZ2UiLCJtZXNzYWdlIiwiZGlzY29yZFVzZXJJZCIsImRpc2NvcmRVc2VybmFtZSIsImRpc2NvcmRNZXNzYWdlSWQiLCJjb250ZW50IiwiY2F0ZWdvcnkiLCJlbWJlZHMiLCJnZXRDb2xsZWN0ZWRNZXNzYWdlIiwicXVlcnlTdHJpbmciLCJjcmVhdGVRdW90ZXNJbnN0YW5jZSIsImlzUnVubmluZyIsImNyb25JZCIsImNyb25Ib3VyIiwiaW5zdGFuY2UiLCJnZXRRdW90ZXNJbnN0YW5jZSIsImdldEFsbFF1b3Rlc0luc3RhbmNlcyIsInVwZGF0ZVF1b3Rlc0luc3RhbmNlIiwiZGVsZXRlUXVvdGVzSW5zdGFuY2UiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVlBLFlBQVksU0FBUztBQUNqQ0EsT0FBT0MsTUFBTTtBQUNiLFNBQVNDLGFBQWEsUUFBUSxNQUFNO0FBQ3BDLFNBQVNDLElBQUksRUFBRUMsT0FBTyxRQUFRLE9BQU87QUFDckMsT0FBT0MsY0FBYyxpQkFBaUI7QUFHdEMsTUFBTUMsYUFBYUYsUUFBUUYsY0FBYyxZQUFZSyxHQUFHO0FBQ3hELE1BQU1DLFNBQVNMLEtBQUtHLFlBQVk7QUFFaEMsTUFBTUcsS0FBSyxJQUFJSixTQUFTRyxRQUFRO0lBQzlCRSxlQUFlO0FBQ2pCO0FBRUEsTUFBTUMsWUFBWTtJQUNoQkMsaUJBQWlCLE9BQU9DO1FBQ3RCLE1BQU1DLFFBQVFMLEdBQUdNLE9BQU8sQ0FBQyw4Q0FBOENDLEdBQUcsQ0FBQ0g7UUFDM0VJLFFBQVFDLEdBQUcsQ0FBQ0o7UUFDWixJQUFJQSxNQUFNSyxTQUFTLEtBQUssR0FBRyxPQUFPO1FBQ2xDLE9BQU87SUFDVDtJQUNBQyxlQUFlO1FBQ1gsTUFBTU4sUUFBUUwsR0FBR00sT0FBTyxDQUFDLHlCQUF5Qk0sR0FBRztRQUNyRCxPQUFPUDtJQUNYO0lBQ0FRLG9CQUFvQixlQUFlQyxXQUFXO1FBQzVDLElBQUk7WUFDRmQsR0FBR2UsSUFBSSxDQUFDO1lBQ1IsTUFBTVYsUUFBUUwsR0FBR00sT0FBTyxDQUFDO1lBQ3pCRCxNQUFNVyxHQUFHLENBQUNGLFlBQVlHLFdBQVcsRUFBRUgsWUFBWUksU0FBUztZQUN4RCxPQUFPO2dCQUNM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