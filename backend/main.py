import tensorflow as tf
import keras.models
import numpy as np
from PIL import Image
from keras.applications.vgg16 import preprocess_input

model = keras.models.load_model("./model_asave/")
def convertImage(image):
    image = tf.keras.utils.load_img(image, target_size=[224, 224])
    image = tf.keras.utils.img_to_array(image)
    image = np.reshape(image, (-1, 224, 224, 3))
    image = preprocess_input(image)
    return image

def getPrediction(image):
    image = convertImage(image)
    print(image.shape)
    y_prob = model.predict(image)
    print(y_prob)

# print(convertImage('koala.png'))
# print(getPrediction('koala.png'))
getPrediction('koala.png')
