export async function fetchLogoUrl(name: string): Promise<string | null> {


    try {
      const response = await fetch(`https://img.logo.dev/${name}.com?token=pk_DwAspn2NS0W0fWUbG4Qy5Q&size=200&format=png`)
        
      if(response.ok) {
        console.log("Logo fetched successfully:", response.url);
        return response.url;
      }
    
    } catch (error) {
        console.error("Error fetching logo:", error);
        return null;
    }

    return null;


}