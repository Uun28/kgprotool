export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ message: "Email is required." }, { status: 400 });
    }

    const resp = await fetch('https://minangkabau-gsm.store/lostpassword.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email }).toString(),
    });

    const data = await resp.json();
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Server error." }, { status: 500 });
  }
}
