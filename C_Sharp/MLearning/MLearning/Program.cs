using System;
using System.Diagnostics;
using Microsoft.ML;
using Microsoft.ML.Data;


namespace MLearning
{
    class Program
    {
        public class ComputerData
        {
            public float RAM { get; set; }
            public float Price { get; set; }
        }

        public class Prediction
        {
            [ColumnName("Score")]
            public float Price { get; set;}
        }

        static void Main(string[] args)
        {
            MLContext mLContext = new MLContext();

            ComputerData[] computerData =
            {
                new ComputerData() {RAM=8, Price=800},
                 new ComputerData() {RAM=16, Price=1500},
                  new ComputerData() {RAM=32, Price=2000},
                   new ComputerData() {RAM=64, Price=2500}
        
            };

            IDataView trainingData = mLContext.Data.LoadFromEnumerable(computerData);

            var pipeline = mLContext.Transforms.Concatenate("Features",
                new[] { "RAM" }).Append(mLContext.Regression.Trainers.Sdca(labelColumnName: "Price", maximumNumberOfIterations: 100));

            var model = pipeline.Fit(trainingData);

            ComputerData randomAccessMemory = new ComputerData() { RAM = 100 };

            Prediction price = mLContext.Model.CreatePredictionEngine<ComputerData, Prediction>(model).Predict(randomAccessMemory);

            Debug.WriteLine($"Predicted price for RAM: {randomAccessMemory.RAM} price = { price.Price:C}");
        }
    }
}
