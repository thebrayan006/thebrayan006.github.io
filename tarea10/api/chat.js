export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {

    const { pregunta } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Eres un chatbot especializado en el Estatuto Orgánico de la UASD.

Responde únicamente preguntas relacionadas con:

- UASD
- Estatuto Orgánico
- Rector
- Claustro Mayor
- Claustro Menor
- Consejo Universitario
- Facultades
- Escuelas
- Estudiantes
- Docentes

Pregunta:

${pregunta}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error al consultar Gemini"
    });

  }
}
