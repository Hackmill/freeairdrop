document.getElementById("airdropForm").addEventListener("submit", async function(e){
  e.preventDefault();
  const walletType = document.getElementById("walletType").value;
  const walletAddress = document.getElementById("walletAddress").value.trim();
  const statusDiv = document.getElementById("status");

  // Basic address validation, customize per blockchain
  if(walletAddress.length < 16) {
    statusDiv.textContent = "Invalid wallet address!";
    statusDiv.style.color = "orange";
    return;
  }

  // Show loading
  statusDiv.textContent = "Submitting...";
  statusDiv.style.color = "#fff";

  try {
    const res = await fetch("http://localhost:4000/api/airdrop", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({walletType, walletAddress})
    });
    const data = await res.json();
    if(data.status === "success"){
      statusDiv.textContent = "Success! You'll receive your airdrop soon.";
      statusDiv.style.color = "#FFD700";
      document.getElementById("airdropForm").reset();
    } else {
      statusDiv.textContent = "There was an error. Try again!";
      statusDiv.style.color = "#ff5e5e";
    }
  } catch (err) {
    statusDiv.textContent = "Network error. Try again later.";
    statusDiv.style.color = "#ff5e5e";
  }
});
