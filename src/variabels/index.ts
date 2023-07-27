export const carWashTest = [
    {
        title: 'CarWash 1',
        coords: [51.661926, 39.258588],
    },
    {
        title: 'CarWash 2',
        coords: [51.961926, 39.252588],
    },
    {
        title: 'CarWash 3',
        coords: [51.611926, 39.558588],
    },
    {
        title: 'CarWash 4',
        coords: [51.667926, 39.252588],
    },
    {
        title: 'CarWash 5',
        coords: [51.669926, 39.255588],
    },
    {
        title: 'CarWash 6',
        coords: [51.668926, 39.254588],
    },
    {
        title: 'CarWash 7',
        coords: [51.664926, 39.250588],
    },
    {
        title: 'CarWash 8',
        coords: [51.664926, 39.250588],
    }
]

/* title: string,
label: string,
address: string,
openTime: string,
 */
export const carWashList = [
    {
        'id' : 123,
        "location": {
            "lat": 51.661518,
            "lon": 39.26193
        },
        "carwashes": [
            {
                "id": "208",
                "name": "МОЙ-КА!DS   36Р-26 Робот-мойка",
                "address": "ул. Брусилова, 4/1",
                "isActive": true,
                "type": "Portal",
                "stepCost": null,
                "limitMinCost": null,
                "limitMaxCost": null,
                "boxes": [
                    {
                        "id": "1320",
                        "number": 1,
                        "status": "Free"
                    }
                ],
                "price": [
                    {
                        "id": 18,
                        "name": "Экспресс",
                        "description": "Экспресс",
                        "cost": 250,
                        "costType": "Fix"
                    },
                    {
                        "id": 19,
                        "name": "Стандарт",
                        "description": "Стандарт",
                        "cost": 350,
                        "costType": "Fix"
                    },
                    {
                        "id": 20,
                        "name": "Премиум",
                        "description": "Премиум",
                        "cost": 450,
                        "costType": "Fix"
                    }
                ],
                "tags": []
            }, 
            {
                "id": "189",
                "name": "МОЙ-КА!DS   36М-26",
               "address": "ул. Брусилова, 4/1",
                "isActive": true,
                "type": "SelfService",
                "stepCost": 10,
                "limitMinCost": 50,
                "limitMaxCost": 500,
                "boxes": [
                    {
                        "id": "1318",
                        "number": 1,
                        "status": "Free"
                    },
                    {
                        "id": "1319",
                        "number": 2,
                        "status": "Free"
                    }
                ],
                "price": [
                    {
                        "id": 1,
                        "name": "Вода + Шампунь",
                        "description": "Вода + Шампунь",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 2,
                        "name": "Мойка Дисков",
                        "description": "Мойка Дисков",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {   
                        "id": 3,
                        "name": "Активания Химия",
                        "description": "Активная Химия",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 4,
                        "name": "Пена T-Power/Щетка",
                        "description": "Пена T-Power/Щетка",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 5,
                        "name": "Ополаскивание",
                        "description": "Ополаскивание",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 6,
                        "name": "Воск + Защита",
                        "description": "Воск + Защита",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 7,
                        "name": "Ополаскивание без разводов",
                        "description": "Ополаскивание без разводов",
                        "cost": 29,
                        "costType": "PerMinute"
    }
                ],
                "tags": []
            }
        ]
    },
    {
        'id' : 222,
        "location": {
            "lat": 51.667518,
            "lon": 39.26193
        },
        "carwashes": [
            {
                "id": "155",
                "name": "МОЙ-КА!DS   36М-11",
               "address": "ул. Брусилова, 4/1",
                "isActive": true,
                "type": "SelfService",
                "stepCost": 10,
                "limitMinCost": 50,
                "limitMaxCost": 500,
                "boxes": [
                    {
                        "id": "1318",
                        "number": 1,
                        "status": "Free"
                    },
                    {
                        "id": "1319",
                        "number": 2,
                        "status": "Free"
                    }
                ],
                "price": [
                    {
                        "id": 1,
                        "name": "Вода + Шампунь",
                        "description": "Вода + Шампунь",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 2,
                        "name": "Мойка Дисков",
                        "description": "Мойка Дисков",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {   
                        "id": 3,
                        "name": "Активания Химия",
                        "description": "Активная Химия",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 4,
                        "name": "Пена T-Power/Щетка",
                        "description": "Пена T-Power/Щетка",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 5,
                        "name": "Ополаскивание",
                        "description": "Ополаскивание",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 6,
                        "name": "Воск + Защита",
                        "description": "Воск + Защита",
                        "cost": 29,
                        "costType": "PerMinute"
                    },
                    {
                        "id": 7,
                        "name": "Ополаскивание без разводов",
                        "description": "Ополаскивание без разводов",
                        "cost": 29,
                        "costType": "PerMinute"
    }
                ],
                "tags": []
            }
        ]
    },
    /* {
        title: 'Car Wash 1',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.661926, 39.258588],
    },
    {
        title: 'Car Wash 11',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.961926, 39.252588]
    },
    {
        title: 'Car Wash 21',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.611926, 39.558588],
    },
    {
        title: 'Car Wash 31',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.667926, 39.252588],
    },
    {
        title: 'Car Wash 41',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.669926, 39.255588],
    },
    {
        title: 'Car Wash 51',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.668926, 39.254588],
    },
    {
        title: 'Car Wash 61',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.664926, 39.250588],
    },
    {
        title: 'Car Wash 71',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.664926, 39.250588],
    },
    {
        title: 'Car Wash 81',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.614926, 39.250588],
    },
    {
        title: 'Car Wash 91',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.634926, 39.250588],
    },
    {
        title: 'Car Wash 101',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.667926, 39.250588],
    },
    {
        title: 'Car Wash 1123',
        label: '1.9 km',
        address: 'Voronezh city, Brusilov street, 4E',
        openTime: '24 hours',
        coords: [51.669926, 39.250588],
    }, */
]