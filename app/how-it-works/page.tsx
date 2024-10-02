"use client";

import Bars from "@/app/assets/Bars.svg";
import Crack from "@/app/assets/Crack.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { CodeBlock } from "react-code-block";

export default function Howitworks() {
  return (
    <div className="relative overflow-x-clip">
      <div className="container flex flex-col justify-center mx-auto mb-40">
        <div className="absolute scale-[250%] left-0 top-0 -rotate-45 opacity-25 -z-[2000]">
          <Image src={Crack} alt="Crack" className="bg-blend-color-dodge" />
        </div>
        <div className="absolute scale-[250%] right-0 rotate-45 opacity-25 -z-[2000]">
          <Image src={Crack} alt="Crack" className="bg-blend-multiply" />
        </div>
        <div>
          <h1 className="text-7xl font-sans leading-snug font-semibold max-w-xl mt-40 gradient-custom ml-56">
            How It Works
          </h1>
        </div>
        <div className="flex justify-center">
          <Image src={Bars} alt="Bars" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto font-mono gradient-custom">
        <Accordion type="single" collapsible>
          <AccordionItem value="introduction">
            <AccordionTrigger className="text-2xl">
              Introduction
            </AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              This project aims to detect cracks in concrete surfaces using a
              Convolutional Neural Network (CNN) built with TensorFlow. The
              model classifies images of concrete as either cracked (positive)
              or non-cracked (negative).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="data-prep">
            <AccordionTrigger className="text-2xl">
              Data Preparation
            </AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              We use a dataset consisting of two types of images:
              <ul className="list-disc list-inside">
                <li>Positive: Images of concrete surfaces with cracks.</li>
                <li>Negative: Images of concrete surfaces without cracks.</li>
              </ul>
              <br />
              <span className="font-bold">Steps</span>
              <ol className="list-decimal list-inside">
                <li>
                  <span className="font-bold">Data Loading</span>: The images
                  are loaded from directories labeled as Positive and Negative.
                </li>
                <li>
                  <span className="font-bold">Dataframes</span>: File paths and
                  labels are organized in dataframes for easy handling.
                </li>
                <li>
                  <span className="font-bold">Train/Test Split</span>: The
                  dataset is split into training (70%) and testing (30%),
                  ensuring that the data is shuffled for a balanced
                  distribution.
                </li>
              </ol>
              <CodeBlockBlock code={dataPrepCode} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="image-preprocessing">
            <AccordionTrigger className="text-2xl">
              Image Preprocessing
            </AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              To prepare the images for model training:
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-bold">Scaling</span>: The pixel values
                  are normalized (rescaled to [0,1]).
                </li>
                <li>
                  <span className="font-bold">Batching and Shuffling</span>:
                  Data is split into batches and shuffled to avoid bias during
                  training.
                </li>
              </ul>
              <CodeBlockBlock code={imagePreProcessingCode} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="model-architecture">
            <AccordionTrigger className="text-2xl">
              Model Architecture
            </AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              We use a simple{" "}
              <span className="font-bold">
                Convolutional Neural Network (CNN)
              </span>{" "}
              to process the images. The CNN consists of:
              <ol className="list-decimal list-inside">
                <li>
                  <span className="font-bold">Convolutional Layers</span>:
                  Extracts image features like edges and textures.
                </li>
                <li>
                  <span className="font-bold">Pooling Layers</span>: Reduces the
                  dimensionality of the data, keeping essential features.
                </li>
                <li>
                  <span className="font-bold">Global Average Pooling</span>:
                  Aggregates the feature maps into a vector.
                </li>
                <li>
                  <span className="font-bold">Dense Output Layer</span>:
                  Classifies the image into cracked (positive) or non-cracked
                  (negative) using a sigmoid function.
                </li>
              </ol>
              <CodeBlockBlock code={modelArchCode} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="model-training">
            <AccordionTrigger className="text-2xl">
              Model Training
            </AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              The model is trained on the processed images using:
              <ol>
                <li>
                  <span className="font-bold">Adam Optimizer</span>: For
                  efficient training.
                </li>
                <li>
                  <span className="font-bold">Binary Cross-Entropy Loss</span>:
                  Since it’s a binary classification problem (cracked or
                  non-cracked).
                </li>
                <li>
                  <span className="font-bold">Early Stopping</span>: To prevent
                  overfitting by stopping the training when the validation loss
                  stops improving.
                </li>
              </ol>
              <CodeBlockBlock code={modelTrainingCode} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="model-evaluation">
            <AccordionTrigger className="text-2xl">
              Model Evaluation
            </AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              The model is evaluated on the test set using metrics like
              accuracy, precision, recall, and F1-score. The model's performance
              is analyzed using a confusion matrix and classification report.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="results">
            <AccordionTrigger className="text-2xl">Results</AccordionTrigger>
            <AccordionContent className="font-mono text-lg">
              The model's performance is analyzed using a confusion matrix and
              classification report. The results are visualized using
              matplotlib.{" "}
              <span className="font-bold">
                The model achieved an accuracy of around 98% on the test set.
              </span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function CodeBlockBlock({ code }: { code: any }) {
  return (
    <CodeBlock code={code} language="python">
      <CodeBlock.Code className="transparent p-6 rounded-xl shadow-lg text-wrap">
        <CodeBlock.LineContent>
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>
    </CodeBlock>
  );
}

const modelArchCode = `
inputs = tf.keras.Input(shape=(120, 120, 3))
x = tf.keras.layers.Conv2D(filters=16, kernel_size=(3, 3), activation='relu')(inputs)
x = tf.keras.layers.MaxPool2D(pool_size=(2, 2))(x)
x = tf.keras.layers.Conv2D(filters=32, kernel_size=(3, 3), activation='relu')(x)
x = tf.keras.layers.MaxPool2D(pool_size=(2, 2))(x)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
outputs = tf.keras.layers.Dense(1, activation='sigmoid')(x)

model = tf.keras.Model(inputs=inputs, outputs=outputs)
`;

const imagePreProcessingCode = `
train_gen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255, validation_split=0.2)
`;

const dataPrepCode = `
train_df, test_df = train_test_split(
    all_df.sample(6000, random_state=1),
    train_size=0.7,
    shuffle=True,
    random_state=1
)
`;

const modelTrainingCode = `
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=100,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=3,
            restore_best_weights=True
        )
    ]
)
`;
