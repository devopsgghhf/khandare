# Cell 1: Import libraries
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
import matplotlib.pyplot as plt

# Cell 2: Create dataset
data = {
    'Outlook': ['Sunny', 'Overcast', 'Rainy', 'Sunny', 'Rainy', 'Sunny'],
    'Temperature': ['Hot', 'Hot', 'Mild', 'Cool', 'Cool', 'Mild'],
    'Humidity': ['High', 'High', 'High', 'Normal', 'Normal', 'High'],
    'Windy': [False, False, False, True, False, True],
    'PlayTennis': ['No', 'Yes', 'Yes', 'Yes', 'Yes', 'No']
}
df = pd.DataFrame(data)

# Cell 3: Encode data
encoders = {}
df_encoded = df.copy()
for column in df_encoded.columns:
    le = LabelEncoder()
    df_encoded[column] = le.fit_transform(df_encoded[column])
    encoders[column] = le  # ✅ Correct: Use the correct column as the key

# Cell 4: Train model
X = df_encoded.drop('PlayTennis', axis=1)
y = df_encoded['PlayTennis']
model = DecisionTreeClassifier()
model.fit(X, y)

# Cell 5: Visualize the decision tree
plt.figure(figsize=(10, 6))
tree.plot_tree(
    model,
    feature_names=X.columns.tolist(),
    class_names=encoders['PlayTennis'].classes_.tolist(),
    filled=True
)
plt.show()

# Cell 6: Predict a new input sample
sample_df = pd.DataFrame([[
    encoders['Outlook'].transform(['Rainy'])[0],
    encoders['Temperature'].transform(['Cool'])[0],
    encoders['Humidity'].transform(['Normal'])[0],
    encoders['Windy'].transform([True])[0]
]], columns=X.columns)

prediction = model.predict(sample_df)
result = encoders['PlayTennis'].inverse_transform(prediction)[0]
print("Input: Outlook = 'Rainy', Temperature = 'Cool', Humidity = 'Normal', Windy = True")
print("Prediction for PlayTennis:", result)
