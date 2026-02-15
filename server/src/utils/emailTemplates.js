export const verifyEmailTemplate = (name, url) => `
  <div style="font-family:Arial">
    <h2>Hey ${name} 👋</h2>

    <p>Click below to verify your email:</p>

    <a href="${url}"
      style="
        background:#2563eb;
        color:white;
        padding:10px 15px;
        border-radius:5px;
        text-decoration:none;
      ">
      Verify Account
    </a>

    <p>If this wasn’t you, ignore.</p>

    <br/>
    <small>— Findora Team</small>
  </div>
`;
