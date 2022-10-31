import os
import requests

# Based on input from user
def lookup(city):
    """Look up weather data by city input"""

    # Contact API
    try:
        api_key = os.environ.get("API_KEY")
        url = f'https://api.weatherstack.com/current?access_key={api_key}&query={city}&units=f'
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        return None

    # Parse response
    try:
        data = response.json()
        return {
            "city": data["location"]["name"],
            "state": data["location"]["region"],
            "country": data["location"]["country"],
            "temperature": data["current"]["temperature"],
            "icon": data["current"]["weather_icons"][0],
            "description": data["current"]["weather_descriptions"][0],
            "feels_like": data["current"]["feelslike"]
        }
    except (KeyError, TypeError, ValueError):
        return None

# Based on geoloacation
def latlong(latitude, longitude):
    """Look up weather data by geolocation"""

    # Contact API
    try:
        api_key = os.environ.get("API_KEY")
        url = f'https://api.weatherstack.com/current?access_key={api_key}&query={latitude},{longitude}&units=f';
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        return None

    # Parse response
    try:
        data = response.json()
        return {
            "city": data["location"]["name"],
            "state": data["location"]["region"],
            "country": data["location"]["country"],
            "temperature": data["current"]["temperature"],
            "icon": data["current"]["weather_icons"][0],
            "description": data["current"]["weather_descriptions"][0],
            "feels_like": data["current"]["feelslike"]
        }
    except (KeyError, TypeError, ValueError):
        return None
