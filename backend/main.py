import tensorflow as tf
import keras.models
import numpy as np
from PIL import Image
from keras.applications.vgg16 import preprocess_input

num_to_class = {0: 'Arts & Photography', 1: 'Biographies & Memoirs', 2:'Business & Money', 3: 'Calendars', 
                4: 'Children\'s Books',	5: 'Comics & Graphic Novels', 6:'Computers & Technology',  7: 'Cookbooks, Food & Wine',
                8: 'Crafts, Hobbies & Home', 9: 'Christian Books & Bibles', 10: 'Engineering & Transportation',  11: 'Health, Fitness & Dieting',
                12: 'History',  13: 'Humor & Entertainment', 14: 'Law',  15: 'Literature & Fiction',
                16: 'Medical Books', 17: 'Mystery, Thriller & Suspense', 18: 'Parenting & Relationships', 19: 'Politics & Social Sciences',
                20: 'Reference', 21: 'Religion & Spirituality', 22: 'Romance', 23: 'Science & Math',
                24: 'Science Fiction & Fantasy', 25: 'Self-Help', 26: 'Sports & Outdoors', 27: 'Teen & Young Adult',
                28: 'Test Preparation', 29: 'Travel' }

bad_to_good = {0: 0, 1: 1, 2: 10, 3: 11, 4: 12, 5: 13, 6: 14, 7: 15, 8: 16, 9: 17, 10: 18, 
               11: 19, 12: 2, 13: 20, 14: 21, 15: 22, 16: 23, 17: 24, 18: 25, 19: 26, 20: 27, 
               21: 28, 22: 29, 23: 3, 24: 4, 25: 5, 26: 6, 27: 7, 28: 8, 29: 9}

model = keras.models.load_model("model_asave/")

def convertImage(image):
    image = tf.keras.utils.load_img(image, target_size=[224, 224])
    image = tf.keras.utils.img_to_array(image)
    image = np.reshape(image, (-1, 224, 224, 3))
    image = preprocess_input(image)
    return image

def getPrediction(image):
    result = {}
    image = convertImage(image)

    y_prob = model.predict(image)

    #make numberPredictions be a list of the (incorrect) predicted categories in descending order
    numberPredictions = np.argsort(y_prob[0])

    #make y_prob be a list of the prediction values in descending order
    y_prob.sort()
    y_prob = y_prob[0][::-1]

    predictions = {}
    for i in range(len(numberPredictions)):
        numberPredictions[i] = bad_to_good[numberPredictions[i]]
        predictions[num_to_class[numberPredictions[i]]] = y_prob[i]
    result['Predictions'] = predictions
    print(result)

# print(convertImage('koala.png'))
# print(getPrediction('koala.png'))
getPrediction('koala.png')
