document.addEventListener("DOMContentLoaded",()=>{
    const resultBox = document.getElementById("trackingResult");
    resultBox.style.display = "none";
    document.getElementById("trackingForm").addEventListener("submit",async function(e){
    e.preventDefault();
    const trackingNumber = document.getElementById("trackingNumber").value.trim();
    resultBox.style.display = "block";
    resultBox.innerHTML = "🔍 Checking tracking info...";
    try{
        const res = await fetch(`/track?number=${trackingNumber}`);

        if(!res.ok) throw new Error("Tracking number is not found");
        const data = await res.json();
        setTimeout(()=>{
          resultBox.innerHTML = ` <div class="resultHeader">
    <span class="check-icon">✔</span>
    <h3>Hello, ${data.name}</h3>
  </div>

  <p class="result-text">We've located your  parcel in our system. Here are the current details:</p>

  <div class="result-info">
     <p><strong>Sender:</strong> ${data.sender}</p>
    <p><strong>Weight:</strong> ${data.weight}</p>
    <p><strong>Package Nature:</strong> ${data.nature}</p>
    <p><strong>Status:</strong> <span class="status-badge ${data.status.toLowerCase().replace(" ", "-")}">${data.status}</span></p>
    <p><strong>ETA:</strong> ${data.eta}</p>
    <p><strong>📍 Current Location:</strong> <span class="location">${data.currentLocation}</span></p>
    <p><strong>Destination:</strong> ${data.destination}</p>
  </div>
  <p class="note">📞 Don’t hesitate to contact us for any further questions.</p>
  <a href = "map.html" target "_blank" class = "mapButton">Track On Map</a>
  `
;},1000);
        
    }
    catch(err){
      setTimeout(()=>{
          resultBox.innerHTML = "❌ " + err.message + `<br></br>Please contact support we will help you`;},1000);
          
        
        }
});
  
});

document.addEventListener("DOMContentLoaded", () => {
  const quoteForm = document.getElementById("quoteForm");
  const quoteSuccess = document.getElementById("quoteSuccess");

  quoteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Generate random alphanumeric quote ID
    const quoteID = 'XTR-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Build success message
    quoteSuccess.innerHTML = ` 
      ✅ Quote created successfully<br>
      <strong>Reference ID:</strong> ${quoteID}<br>
      Please wait for an email response with more information.`
    ;

    quoteSuccess.style.display = "block";

    // Optionally clear the form
    quoteForm.reset();
  });
});