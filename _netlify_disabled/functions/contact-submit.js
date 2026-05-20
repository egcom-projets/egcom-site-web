const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        
        const { name, email, phone, project_type, city, budget, message } = data;
        
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Champs requis manquants' })
            };
        }
        
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        const { error: dbError } = await supabase
            .from('contact_messages')
            .insert([{
                name,
                email,
                phone: phone || null,
                project_type: project_type || null,
                city: city || null,
                budget: budget || null,
                message
            }]);
        
        if (dbError) {
            console.error('Database error:', dbError);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Erreur lors de l\'enregistrement du message' })
            };
        }
        
        if (resendApiKey) {
            try {
                const emailResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${resendApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'EGCOM Website <onboarding@resend.dev>',
                        to: ['egcom.projets23@gmail.com'],
                        subject: `Nouveau message de contact - ${name}`,
                        html: `
                            <h2>Nouveau message de contact</h2>
                            <p><strong>Nom:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
                            ${project_type ? `<p><strong>Type de projet:</strong> ${project_type}</p>` : ''}
                            ${city ? `<p><strong>Ville:</strong> ${city}</p>` : ''}
                            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
                            <p><strong>Message:</strong></p>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                        `
                    })
                });
                
                if (!emailResponse.ok) {
                    console.error('Email sending failed:', await emailResponse.text());
                }
            } catch (emailError) {
                console.error('Email error:', emailError);
            }
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Message envoyé avec succès' })
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erreur serveur' })
        };
    }
};
