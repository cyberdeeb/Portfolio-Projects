import os
import requests

#api_key = os.environ.get("API_KEY")
url = f'https://api.weatherstack.com/current?access_key=3ebc71d207a75df2ec51687b183d8493&query=bellflower&units=f'
response = requests.get(url)
response.raise_for_status()

    # Parse response
data = response.json()
weather = {
            "city": data["location"]["name"],
            "state": data["location"]["region"],
            "country": data["location"]["country"],
            "temperature": data["current"]["temperature"],
            "icon": data["current"]["weather_icons"][0],
            "description": data["current"]["weather_descriptions"][0],
            "feels_like": data["current"]["feelslike"]
}
print(weather)
