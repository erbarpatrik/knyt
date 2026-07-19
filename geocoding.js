export async function getAddress(lat, lng) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );
  
    if (!response.ok) {
      throw new Error("Nem sikerült lekérni a címet.");
    }
  
    const data = await response.json();
  
    return data;
  }