## To run this project all u have to do is 2 step

 ### go to your mongodb atlas account 
>> go to   **`Database`** section at the left side and then go to **`Connect`** and then go to **`Driver`** and then copy the **`mongodb connection string`** which is look like this   

>> **`mongodb+srv://<username>:<password>@cluster1.r104mlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`**

>> and then go to the **`Database Access`** in left side and then create a new database user please save the **`username`** and **`password`** and then paste it to the mongodb connection string **`<username>`** and **`<password>`** section  
>> and remember one thing Dont forget to add **`Built-in-role`** to **`Read and write to any database`**




 ### create a .env file in root directory and then 
>> **`DATABASE_URL`**="Your mongodb connection string"  
>> **``PORT``** = 3000  
>> remember one thing don't add any semicolon or any single or double quotes  

 ### run this command in your terminal
>> npm install


 ### after install everything correctly
>> run `npm run start:prod`



