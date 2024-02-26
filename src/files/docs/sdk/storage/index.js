import {Client} from '@apibrew/client';
import {StorageServiceImpl} from "@apibrew/client/storage/impl/storage-service-impl";

// ...  //

const client = Client.newClient();


const storageService = new StorageServiceImpl(client, "https://storage.apibrew.io:8443/<your-project-id>");

// Uploading file

// First you need to create new StorageObject
let storageObject = {}

storageObject = await storageService.repository().create(storageObject);

// Then you can upload file
// There are multiple ways to upload file
// 1. From byte array
await storageService.uploadBytes(storageObject.getId(), Buffer.from([1,2,3,4]), "test.txt");

// 2. From file
await storageService.uploadFile(storageObject.getId(), "test.txt");

// Downloading file

// 1. To byte array
const bytesBuffer = storageService.downloadBytes(storageObject.getId());

// 2. To file
await storageService.downloadFile(storageObject.getId(), "test.txt");
