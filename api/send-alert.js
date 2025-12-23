const sgMail = require('@sendgrid/mail');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, topic, count, articles } = req.body;
    
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({ error: 'SendGrid API key not configured' });
    }
    
    if (!process.env.SENDER_EMAIL) {
      return res.status(500).json({ error: 'Sender email not configured' });
    }
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const articlesHtml = articles && articles.length > 0
      ? articles.map(a => `<li><a href="${a.link}">${a.title}</a> <small>(${a.source || 'Unknown'})</small></li>`).join('')
      : '<li>No articles available</li>';
    
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: `🚨 News Spike Alert: ${topic}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #ef4444; margin-top: 0;">⚠️ Spike Detected!</h2>
            <p style="font-size: 16px;"><strong>Topic:</strong> ${topic}</p>
            <p style="font-size: 16px;"><strong>Articles Found:</strong> ${count}</p>
            <h3 style="color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Recent Articles:</h3>
            <ul style="line-height: 1.8; color: #475569;">
              ${articlesHtml}
            </ul>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #64748b; font-size: 12px; text-align: center;">
              This alert was sent by your News Monitor on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };
    
    await sgMail.send(msg);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Alert email sent successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error sending alert:', error);
    return res.status(500).json({ 
      error: 'Failed to send alert', 
      details: error.message 
    });
  }
};
