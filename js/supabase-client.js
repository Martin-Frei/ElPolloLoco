// js/supabase-client.js

const SUPABASE_URL = 'https://rgwnmnoxgffliuefusyj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5EUw-zEPh-ZMy2A4zvhK8g_J6t1mRS0';

export class SupabaseClient {
    constructor() {
        this.url = SUPABASE_URL;
        this.key = SUPABASE_KEY;
    }
    
    // Highscore speichern
    async saveHighscore(playerName, score, level, coins, time) {
        try {
            const response = await fetch(`${this.url}/rest/v1/highscores`, {
                method: 'POST',
                headers: {
                    'apikey': this.key,
                    'Authorization': `Bearer ${this.key}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    player_name: playerName,
                    score: score,
                    level: level,
                    coins_collected: coins,
                    time_seconds: time
                })
            });
            
            if (response.ok) {
                console.log('✅ Highscore saved!');
                return true;
            } else {
                const errorText = await response.text();
                console.error('❌ Save Error:', errorText);
                return false;
            }
        } catch (error) {
            console.error('❌ Supabase Error:', error);
            return false;
        }
    }
    
    // Top 10 Highscores laden
    async getTop10() {
        try {
            const response = await fetch(
                `${this.url}/rest/v1/highscores?select=*&order=score.desc&limit=10`,
                {
                    headers: {
                        'apikey': this.key,
                        'Authorization': `Bearer ${this.key}`
                    }
                }
            );
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Top 10 loaded:', data);
                return data;
            } else {
                const errorText = await response.text();
                console.error('❌ Load Error:', errorText);
                return [];
            }
        } catch (error) {
            console.error('❌ Supabase Error:', error);
            return [];
        }
    }
}