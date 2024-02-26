import io.apibrew.client.Client;
import io.apibrew.client.storage.StorageService;
import io.apibrew.client.storage.impl.StorageServiceImpl;
import io.apibrew.client.storage.model.StorageObject;

import java.io.File;
import java.io.FileInputStream;

...

Client client = Client.newClient();

StorageService storageService = new StorageServiceImpl(client, "https://storage.apibrew.io:8443/<your-project-id>");

// Uploading file

// First you need to create new StorageObject
StorageObject storageObject = new StorageObject();

storageObject = storageService.repository().create(storageObject);

// Then you can upload file
// There are multiple ways to upload file
// 1. From byte array
storageService.uploadBytes(storageObject.getId(), new byte[]{1, 2, 3}, "test.txt");

// 2. From byte array with mime type
storageService.uploadBytes(storageObject.getId(), new byte[]{1, 2, 3}, "test.txt", "text/plain");

// 3. From file
storageService.uploadFile(storageObject.getId(), new File("test.txt"));

// 4. From file with mime type
storageService.uploadFile(storageObject.getId(), new File("test.txt"), "text/plain");

// 5. From input stream
try (FileInputStream fis = new FileInputStream("text.txt")) {
    storageService.uploadStream(storageObject.getId(), fis, "test.txt");
}

// 6. From input stream with mime type
try (FileInputStream fis = new FileInputStream("text.txt")) {
    storageService.uploadStream(storageObject.getId(), fis, "test.txt", "text/plain");
}

// Downloading file

// 1. To byte array
byte[] bytes = storageService.downloadBytes(storageObject.getId());

// 2. To file
storageService.downloadFile(storageObject.getId(), "test.txt");
