import requests
import json


def whole_float_to_int(float_number):
    if float_number.is_integer():
        whole_number = str(int(float_number))
        return whole_number
    else:
        return float_number


def planets_from_api(page_num):
    all_planet_data = []
    response = requests.get('http://swapi.co/api/planets/?page=' + str(page_num)).json()
    response = response['results']
    for dictionary in response:
        actual_planet_data = {}
        for key, value in dictionary.items():

            if key == 'url':
                if len(value) == 30:
                    planet_id_from_url = value[-2]
                else:
                    planet_id_from_url = value[-3:-1]
                actual_planet_data.update({'id': planet_id_from_url})

            elif key == 'name' or key == 'climate' or key == 'terrain':
                actual_planet_data.update({key: value})

            elif key == 'diameter':
                if value.isnumeric():
                    diameter_in_km = int(value) / 1000
                    diameter_in_km = whole_float_to_int(diameter_in_km)  # if it gets a whole float number convert it to simple integer
                    actual_planet_data.update({key: diameter_in_km})
                else:
                    actual_planet_data.update({key: value})
            elif key == 'surface_water':
                if value.isnumeric():
                    surface_water_percentage = value + '%'
                    actual_planet_data.update({key: surface_water_percentage})
                else:
                    try:
                        float(value)
                    except ValueError:
                        actual_planet_data.update({key: value})
                    else:
                        surface_water_percentage = value + '%'
                        actual_planet_data.update({key: surface_water_percentage})

            elif key == 'population':
                if value.isnumeric():
                    divide_population = float(value) / 1000000
                    divide_population = whole_float_to_int(divide_population)  # if it gets a whole float number convert it to simple integer
                    actual_planet_data.update({key: divide_population})
                else:
                    actual_planet_data.update({key: value})

            elif key == 'residents':
                number_of_residents = str(len(value))
                actual_planet_data.update({key: number_of_residents})
                json_valid_value = json.dumps(value)  # Convert (list) value to valid json format to make jquery able to read it out from DOM
                actual_planet_data.update({'residents_url': json_valid_value})
        all_planet_data.append(actual_planet_data)
    return all_planet_data