import fs from "fs";

var kommuneFeatureIds = [
  { nummer: "3452", featureId: "a3c6c83a-5ef4-4e11-a0c3-e454c9f82766" },
  { nummer: "4601", featureId: "602ba259-f046-428c-ab57-ce0428bd5bb4" },
  { nummer: "4213", featureId: "8bbe531e-9251-425a-aff7-06395d4e3e52" },
  { nummer: "4627", featureId: "2bdfc1fd-8d82-4680-8230-6deed0161941" },
  { nummer: "3324", featureId: "8d31abbc-48e2-462f-aceb-45c757ee552a" },
  { nummer: "3222", featureId: "62099986-00d2-40d1-91d2-27c4403a1889" },
  { nummer: "4650", featureId: "5ffa97f4-1123-4da4-83ec-ba1095b48a4a" },
  { nummer: "1120", featureId: "774b068a-acd2-4a85-9543-333ffaa70855" },
  { nummer: "1812", featureId: "1186aae1-e02e-4b65-81a3-cbde27cc46d1" },
  { nummer: "4645", featureId: "8a4368df-49d2-4860-ba79-95dec7a8f69d" },
  { nummer: "4228", featureId: "a850598b-bdbf-4d9c-b19a-a0bded54b92a" },
  { nummer: "3301", featureId: "624b7261-5dde-4188-be99-c419d90d514f" },
  { nummer: "1506", featureId: "48e19a67-f1f2-44f2-9f3d-9227a699776f" },
  { nummer: "5528", featureId: "cff75a78-ffd4-4148-b59e-a1e4e87f6819" },
  { nummer: "5542", featureId: "728b21bc-5980-4fbd-bf23-86d22b0f8b68" },
  { nummer: "5031", featureId: "fe328f8d-fbde-4c21-ab28-cbc583be401f" },
  { nummer: "4602", featureId: "54e5adae-5e1f-42df-bcfe-d23a55d2bcef" },
  { nummer: "5041", featureId: "92291601-dbeb-432a-b640-eb31d0ac6ff0" },
  { nummer: "3212", featureId: "9667a7b5-c49d-40fa-9826-25323e7aa30d" },
  { nummer: "4632", featureId: "75299d27-bbbd-4e35-89ce-a22f906be1a9" },
  { nummer: "3435", featureId: "6d39c208-6c56-4a41-9295-c1078927ac6b" },
  { nummer: "5047", featureId: "340fff7f-b153-4a87-814d-12ca4f2d1682" },
  { nummer: "3451", featureId: "f5284a4c-bf96-4050-bb44-ed9c2cbe94be" },
  { nummer: "5061", featureId: "5b5f81f4-5cc8-48a0-ae54-276032124929" },
  { nummer: "4034", featureId: "7edb0a10-2bd0-4351-a78d-ba2d1c23728e" },
  { nummer: "1121", featureId: "0e48ed51-ce27-45c0-b7bc-76ff37405c6a" },
  { nummer: "3440", featureId: "031025af-21ad-4f36-976d-7ab8f31c8910" },
  { nummer: "3334", featureId: "4fa5acd2-865e-432f-9b22-a1c77c40fb10" },
  { nummer: "3214", featureId: "37f9dcca-d06d-41a0-b8e3-13fdfd94c854" },
  { nummer: "4020", featureId: "6ca26978-f7bf-4582-91a3-d09bb73f71e3" },
  { nummer: "5624", featureId: "148308fc-f444-442d-8617-b4f3b7d51892" },
  { nummer: "1133", featureId: "351ba144-37bc-4d7b-a5bf-a3b2ddcb87a2" },
  { nummer: "1514", featureId: "617485c7-dd5e-42b7-9888-e94513444835" },
  { nummer: "1557", featureId: "92e7f845-3aa8-4438-aded-734347959e15" },
  { nummer: "5634", featureId: "8151c0e9-5926-44dc-93d4-8a47144c0d1f" },
  { nummer: "3447", featureId: "7ab6dfbf-b403-402b-9a3c-8e9cdf3410e0" },
  { nummer: "3419", featureId: "999ff9a4-33de-4ba7-9d39-d27f89752f55" },
  { nummer: "4219", featureId: "8b023c74-4db4-48f9-8a5c-a3124c75da14" },
  { nummer: "1577", featureId: "7ae4b5f6-2220-47aa-b746-27e822396a5a" },
  { nummer: "3422", featureId: "6815741a-a3c3-4011-81a8-97d861af91ee" },
  { nummer: "1573", featureId: "35b9a8e2-32dc-4301-a739-d290d69ea19c" },
  { nummer: "5630", featureId: "f410cc5f-ea29-466d-9c55-63238967adcc" },
  { nummer: "5538", featureId: "c78c38f7-7090-45ba-8ec5-7f642bc86fc1" },
  { nummer: "1839", featureId: "98ba7f4f-4600-4702-b96a-54fb34d8ab6e" },
  { nummer: "4216", featureId: "00c8db8e-e381-4515-81ce-d6dca496c443" },
  { nummer: "3234", featureId: "2236475d-71c8-48c5-90d1-7055c065305a" },
  { nummer: "5524", featureId: "8b91f9f4-22f8-49e8-8b11-32c005e534aa" },
  { nummer: "3407", featureId: "69955d74-46c1-4e31-a1d8-ccc5bb578701" },
  { nummer: "3442", featureId: "f7c6e517-553a-46a4-8048-781d685aeab3" },
  { nummer: "3429", featureId: "9def2406-0c19-4e3e-aef1-089b0e69f926" },
  { nummer: "5033", featureId: "a958447a-bec5-414e-adfd-5b2a5311e3dc" },
  { nummer: "5027", featureId: "4e8f0138-2f58-473c-91fe-813ea0bfcc6a" },
  { nummer: "4227", featureId: "e204d602-bd11-4323-8651-5f7e103a7cd9" },
  { nummer: "3224", featureId: "16d03e0c-78cc-4dbc-aedb-03962284d27e" },
  { nummer: "1130", featureId: "917cb247-d8f1-46ef-8fc5-decc2cdde6fe" },
  { nummer: "1824", featureId: "7f607a8b-adf6-4512-9f75-2c2a95a9ee8f" },
  { nummer: "4005", featureId: "164e6569-2171-4f1a-aead-0fdba4c089d7" },
  { nummer: "3428", featureId: "314cf49e-afb3-466e-a12f-1df87b34ee3f" },
  { nummer: "3205", featureId: "1f772d03-781f-41ba-9532-348fec03cd17" },
  { nummer: "1832", featureId: "e15ec547-2b87-4765-8301-13230485dfa6" },
  { nummer: "3412", featureId: "f630dc4c-6297-4a96-a93f-40e30422c131" },
  { nummer: "5025", featureId: "59052a09-adad-48e8-9bae-0a20ffca79d1" },
  { nummer: "5029", featureId: "20f6d491-f96b-413f-bb5e-cd0a2b92b69f" },
  { nummer: "4218", featureId: "5c57c0a1-e908-4088-aa8f-cb7f9ab0200a" },
  { nummer: "1834", featureId: "5bdc379c-ef04-496f-a65f-9a6ca5cb66e4" },
  { nummer: "3443", featureId: "28acd8cd-ec05-4746-92cc-4aeee880239b" },
  { nummer: "3432", featureId: "cbc345bd-70cc-4131-85b5-534428553212" },
  { nummer: "4207", featureId: "85253364-c56c-4140-bd1e-fd77ad3474d5" },
  { nummer: "3413", featureId: "5feb1d14-3304-4366-a03b-3113d40ff962" },
  { nummer: "4016", featureId: "d83142aa-d004-4a60-86fb-6291b233c2ec" },
  { nummer: "4638", featureId: "8a7ad424-0adc-4925-9e04-cf17bd2b4357" },
  { nummer: "4617", featureId: "d4fdef3f-f8d2-414c-ae44-be9fa4bf1e9a" },
  { nummer: "4018", featureId: "123e97ca-43df-4b98-9244-1bf9c98c8076" },
  { nummer: "1112", featureId: "b4566a47-7868-430f-9a36-412c6e9dc702" },
  {
    nummer: "1508",
    featureId:
      "efe40656-9764-4926-ac55-d04d4665f3ef966d44cb7ace1f0cb0e2828d2a8e2ee032207fa9938ac46dc5979f3527fe0db1",
  },
  { nummer: "1818", featureId: "4dec3cc9-e515-4fa9-ba7f-9387e1c8800c" },
  { nummer: "1857", featureId: "607b4a39-83e8-407c-8e38-fffb0f3c288b" },
  { nummer: "5035", featureId: "29cbae47-572b-4871-874e-931323ad34d1" },
  { nummer: "5007", featureId: "911b4d14-99b3-46e1-94a8-62bf2e07c4ab" },
  { nummer: "1845", featureId: "7fc5dd85-a0e9-48cd-9188-e716c23c5263" },
  { nummer: "5055", featureId: "62e7e196-7c17-4a39-b979-412249ead977" },
  { nummer: "4036", featureId: "a2b4ac1b-74a5-4477-bc99-16fc386e8a5c" },
  { nummer: "5020", featureId: "502e2b5d-2bf1-4dd6-a48f-0692e729f364" },
  { nummer: "4615", featureId: "9b992a9e-edf4-413f-afb1-85ca757fc457" },
  { nummer: "3303", featureId: "9ac00bfb-2139-44b7-9089-ff48b1acf1ac" },
  { nummer: "3230", featureId: "ffd39f1e-f20e-4559-80c9-42b911aac29b" },
  { nummer: "5614", featureId: "42b6831f-ee82-4c75-9d14-1d49ff1e1de1" },
  { nummer: "4003", featureId: "886dd687-f7a3-448d-99b5-783b741646cb" },
  { nummer: "3418", featureId: "3eb0d321-8929-4ee2-a7f4-d92e06cd15d7" },
  { nummer: "4624", featureId: "543ac82b-d449-4fbe-bd93-8eaf7e16ef8c" },
  { nummer: "3103", featureId: "303d1b06-2b89-4688-ae96-85a61b00985f" },
  { nummer: "4616", featureId: "f946e9a0-2bda-46e6-89d3-c696d4be79d5" },
  { nummer: "3238", featureId: "39eabef1-5fa1-408b-b011-2e233713c784" },
  { nummer: "4644", featureId: "582a15e4-d853-4501-8d37-057432110a8d" },
  { nummer: "3437", featureId: "6b6b547f-cb7a-4ee4-877c-527a15436b5d" },
  { nummer: "5526", featureId: "ad422879-e9f4-4f48-8110-dd294c127405" },
  { nummer: "1135", featureId: "fe5f31c2-8d83-4290-89ae-7a28632dd057" },
  { nummer: "1122", featureId: "5c28ff58-9e10-493a-a12c-df15d41cebd4" },
  { nummer: "4647", featureId: "46f06c02-ffdb-482f-b1c1-3b0ca7282eca" },
  { nummer: "4611", featureId: "fcdbda7d-52e8-4075-b100-5f35c56a9439" },
  { nummer: "3240", featureId: "0ba35d78-bc81-4eb9-829d-2f6f77723754" },
  { nummer: "3328", featureId: "e4f877ca-9330-4830-85d8-d116a738be2a" },
  { nummer: "1119", featureId: "b6c5a7ed-eb81-4e9d-81b3-a09b2393bed3" },
  { nummer: "1505", featureId: "753d80fa-0806-4a1d-820d-a15e197c261d" },
  { nummer: "5612", featureId: "c7da53d0-cd0f-416c-92fb-fb15d796a9b5" },
  { nummer: "1579", featureId: "d73265d8-64ac-4a5c-804f-f2e727d748d6" },
  { nummer: "1511", featureId: "c1c3768f-f923-4e6a-b0d1-8b4459baee61" },
  { nummer: "5036", featureId: "1a028be5-a934-4aed-a178-2b87a8f7c945" },
  { nummer: "5049", featureId: "f312a830-5884-4741-8b23-7e1352a1a113" },
  { nummer: "4026", featureId: "71d8fb41-ca12-4678-901b-6614cc354a43" },
  { nummer: "1160", featureId: "fc39e78f-5259-4503-be78-1ced36f9d057" },
  { nummer: "1836", featureId: "ba889808-a24b-41b5-ab28-410804599e22" },
  { nummer: "5628", featureId: "8391ebe6-293c-4709-a0c5-a15824b58fdd" },
  { nummer: "3326", featureId: "05ca13f5-6ac0-45c2-a90b-d6e6cd0c97ab" },
  { nummer: "0301", featureId: "2f8abeb3-f180-4800-84a3-df6653fc9468" },
  { nummer: "4620", featureId: "e1064c65-a858-4dcb-9e43-fd2393261909" },
  { nummer: "3411", featureId: "d844ccd3-0f28-4dd8-9c7a-7c6d71a46123" },
  { nummer: "1531", featureId: "8e2e4d7c-17ba-46d1-ae77-f5cd29ed16ca" },
  { nummer: "1841", featureId: "c0cb164d-c3e4-4744-a925-49f48f46b3e9" },
  { nummer: "1539", featureId: "41b31bfc-b149-4d47-afe7-83190cd1f2bf" },
  { nummer: "3439", featureId: "af40bc87-d843-4118-8fae-d79e8a39ec3b" },
  { nummer: "3236", featureId: "4ccbb9f7-560e-4d5e-9dce-13be03868c75" },
  { nummer: "5028", featureId: "778af2cb-3c48-4c6c-9841-6a35f2288fb9" },
  { nummer: "4637", featureId: "6f4737c7-908c-4c1a-918b-8e1a5b20ef6b" },
  { nummer: "1804", featureId: "718c439f-412f-4d29-9ae5-63649a33d1eb" },
  { nummer: "5046", featureId: "4e93a0d0-eeda-47e1-83f4-cbc9103b6371" },
  { nummer: "4201", featureId: "f25a6be2-d809-4eb4-806b-d2fab4c9ca09" },
  { nummer: "1835", featureId: "ac286f86-e44c-40d1-b26f-fc83a2501dc1" },
  { nummer: "1866", featureId: "2a9247bd-d002-420e-93f2-dd7dddc3bb59" },
  { nummer: "4217", featureId: "dbcd6009-d567-44e1-b075-260f19c503ff" },
  { nummer: "4212", featureId: "25c2b192-c6b5-4d2c-ba4e-08ab31b4432d" },
  { nummer: "4204", featureId: "9f3d9ee1-a622-4515-ac6c-b5b10ebde6f3" },
  { nummer: "5522", featureId: "0c43df46-5632-4137-9d16-5f91d1a3926c" },
  { nummer: "4640", featureId: "93a8d91b-ec0e-42dd-a5fd-840c209e8c1f" },
  { nummer: "3453", featureId: "18a50d4c-a5ab-47ae-bf7d-54391c67637d" },
  { nummer: "5546", featureId: "a928078f-8e99-4f8f-9c17-02ecc41364eb" },
  { nummer: "1867", featureId: "c743b3fd-d65d-4361-8197-ed3a8e8d7ab1" },
  { nummer: "3207", featureId: "ba7a7903-d55a-4b0e-864a-fe8a2b8bb244" },
  { nummer: "3405", featureId: "2f058caf-4db8-454d-84df-ef7d633c5ed6" },
  { nummer: "5054", featureId: "417e942c-90ff-4297-86bc-9ae97da886b7" },
  { nummer: "1528", featureId: "88471efb-83cb-4382-b5b5-6c7bde18163f" },
  { nummer: "5060", featureId: "09f76545-99bb-45f0-99e6-692a92f4081c" },
  { nummer: "5045", featureId: "17af92d9-02dd-497f-8668-9168a3bd6f79" },
  { nummer: "3316", featureId: "1765b21a-d1ef-48b5-88c4-b0bc1742f123" },
  { nummer: "1859", featureId: "a458efe0-b6bf-420c-9c13-5200e0a93adb" },
  { nummer: "4646", featureId: "1d284acf-fc2c-4a5c-ae34-4e5afe0bec77" },
  { nummer: "3903", featureId: "d4f05891-b2e5-486d-952e-a4f45c994732" },
  { nummer: "3424", featureId: "0f821a2d-a307-41ec-9b64-f01c80e39357" },
  { nummer: "1822", featureId: "58ff3e34-807b-4395-999d-9f9b03ac38b1" },
  { nummer: "3332", featureId: "e06e8cb6-f18d-46d4-9c5b-30a119ecd02e" },
  { nummer: "1566", featureId: "8fb10503-5db3-4a0d-899d-a26c776c194e" },
  { nummer: "1127", featureId: "acb787f3-83a1-4deb-b2c2-4852a0d39a74" },
  { nummer: "5503", featureId: "fb0a6748-d430-428f-9a0b-c2c3b63f6789" },
  { nummer: "4225", featureId: "b80d311a-3d78-457f-bb5c-0e023679b13a" },
  { nummer: "1848", featureId: "9d8a9163-f623-4bc9-8a32-669b75915d5a" },
  { nummer: "1815", featureId: "221267b1-71d7-4d04-ba93-f667ceda7152" },
  { nummer: "1101", featureId: "e320f269-23c2-4ae8-922e-b92fe684e96c" },
  { nummer: "5605", featureId: "468e68cb-c1f3-4bf8-bb58-23ef6d0aab9e" },
  { nummer: "3901", featureId: "0eb906fa-62e4-42e2-b0b6-26177b4009d4" },
  { nummer: "5042", featureId: "1c05aa4d-4c4d-4869-af88-406b25842381" },
  { nummer: "4634", featureId: "5f22812b-9f2b-47e8-b4bf-1d80620f4bf2" },
  { nummer: "1813", featureId: "198eef71-90ea-47f4-acd3-1e21b80e39a3" },
  { nummer: "1870", featureId: "87eebee0-8d8d-4e4a-88d3-99170ede0bf2" },
  { nummer: "1851", featureId: "f18707e6-8ce4-4b0b-b614-501ebb1692eb" },
  {
    nummer: "1580",
    featureId:
      "efe40656-9764-4926-ac55-d04d4665f3ef309adcd6ebb29b25f943202101bd25629c640705329b831e6dbc530e29ed428c",
  },
  { nummer: "5056", featureId: "7b69ba4e-a8c8-4013-8aa5-751f0f1d176c" },
  { nummer: "5053", featureId: "0134921c-0ff3-4188-bc05-acfdb5f313a5" },
  { nummer: "3305", featureId: "f6ea4e51-d376-4c6f-9c95-c83bbe83013a" },
  { nummer: "1111", featureId: "4f8bca1c-fdfc-4f15-a31e-aea68932cc0b" },
  { nummer: "1517", featureId: "3ff12043-3562-45a7-ad3a-093ae2b53999" },
  { nummer: "3416", featureId: "0930dfed-de16-48c3-aaa5-0dd56cb2661b" },
  { nummer: "5516", featureId: "bc30051b-5209-4be5-b1fa-4bd6d17cf477" },
  { nummer: "1806", featureId: "6a3369f7-2b15-4719-bf18-6ce46e416d80" },
  { nummer: "5006", featureId: "6880c18a-f70c-4b08-bde5-7c0ac01acac3" },
  { nummer: "5540", featureId: "64df1997-a4cd-446e-a1bc-d36f24fa554f" },
  { nummer: "1865", featureId: "9a0f1628-27c8-4a16-8f6b-506f3d3c6620" },
  { nummer: "5026", featureId: "c7613671-a3c0-4a17-9f42-8450ce7b0df4" },
  { nummer: "3426", featureId: "57f4f1e3-a68a-4e19-b1dc-1e2df6d2a620" },
  { nummer: "3436", featureId: "f24feed6-3165-4023-abc7-de6b844810a6" },
  { nummer: "1520", featureId: "eba4a975-03b9-4257-ae9b-ab447574d180" },
  { nummer: "4628", featureId: "d6e4101e-5c40-40e5-b7b3-1e3c00af3d4b" },
  { nummer: "4222", featureId: "30769506-ab4d-4a00-ab02-2eb28bfb5a90" },
  { nummer: "4220", featureId: "58e7c80f-b9c2-43f6-99b7-4a0ac3eb923b" },
  { nummer: "1554", featureId: "d60c476a-7e36-4675-8ef5-218cf8c0e3d0" },
  { nummer: "4626", featureId: "b8774162-90dd-4039-acb2-a4a6db46fcbc" },
  { nummer: "5532", featureId: "9e24b188-830d-4fb1-8c27-f3428af8a6b4" },
  { nummer: "1145", featureId: "7b7fda38-64a8-4197-a54c-5244f4dc4d64" },
  { nummer: "1106", featureId: "940e4992-3450-4448-97b7-ff992b2950fa" },
  { nummer: "4010", featureId: "837c552b-3a67-43ce-9d5d-5908397f3f74" },
  { nummer: "1563", featureId: "cefd118d-0c98-483d-a9a4-965b0996c479" },
  { nummer: "4202", featureId: "3fbfd0ea-2fc2-4d12-b05a-d3f70913a69e" },
  { nummer: "3216", featureId: "5b6fe7ff-260e-4a9e-b203-b83a71eb0a56" },
  { nummer: "5052", featureId: "e5aeee32-1cd2-4dc5-81d1-4a62460be55d" },
  { nummer: "4623", featureId: "6aa031bd-5108-498f-bf09-0f113b5afe50" },
  { nummer: "3434", featureId: "12ddd70c-6a04-4194-804d-85ca51457dc6" },
  { nummer: "4625", featureId: "adf34999-9830-4695-a2bd-8eadb7cb0043" },
  { nummer: "4631", featureId: "b9fe496b-8cbf-4c7e-bf49-8392a8f54fb6" },
  { nummer: "4641", featureId: "38bc1c6e-d1f2-4979-8988-2549f38f776f" },
  { nummer: "4621", featureId: "8520c379-9da9-4a14-92ad-5fd4cd6d5446" },
  { nummer: "5022", featureId: "2fc1366b-c2f5-45d5-a453-824adcc41d07" },
  { nummer: "3454", featureId: "4073df8a-38ee-4d9e-906d-b5758778013e" },
  { nummer: "1151", featureId: "6f5440e1-0690-4c54-82b5-568b397dd87b" },
  { nummer: "3203", featureId: "ca889b1d-f767-4afc-afed-be95e29ae4fa" },
  { nummer: "3101", featureId: "a6d3e1db-c015-4f66-9913-eafb3cb277d5" },
  { nummer: "3110", featureId: "0d7b8902-b8a3-4e1e-a9fc-df5b2733c617" },
  { nummer: "5034", featureId: "b45137f4-e95c-42aa-85a4-cd5311be2279" },
  { nummer: "1871", featureId: "ea27c7d3-cf73-4a79-b1b7-75abd0b3cf20" },
  { nummer: "5544", featureId: "59dd3930-9f65-49b2-9a3a-3d6c4c03a83b" },
  { nummer: "5607", featureId: "9d7b1475-dfc8-46ad-b70a-f722278f78dc" },
  { nummer: "1144", featureId: "9d37c2e1-9376-4b36-b56c-4116384e18d1" },
  { nummer: "4205", featureId: "1c5f2a65-7542-4701-8679-dd0431ed6a94" },
  { nummer: "1868", featureId: "b74c8d85-746e-4b76-a925-fc8d98f46a76" },
  { nummer: "3414", featureId: "17a11e84-eb13-4aaa-8298-d4a0c848a837" },
  { nummer: "5618", featureId: "b7367e0d-2972-4d9c-93a5-431a10122ac3" },
  { nummer: "5038", featureId: "a3652f85-96d3-42cf-a8e5-aae2c889f330" },
  { nummer: "5043", featureId: "3622cd40-32ca-45e5-9457-68f459f22fed" },
  { nummer: "1826", featureId: "81fcfb11-829c-4676-93e6-69d4ba3b4fe1" },
  { nummer: "1856", featureId: "5aad93ea-c518-4c26-8a75-d99d1c4322cc" },
  { nummer: "3450", featureId: "6fa0e284-ac3b-4ffc-8073-a6c95b339d73" },
  { nummer: "1874", featureId: "3d4c47ef-da17-4fb3-ba70-fc5f7b91b2e5" },
  { nummer: "4206", featureId: "ec2a87f2-8dfa-4fb1-af0b-a9fc64979f14" },
  { nummer: "4224", featureId: "41fc71df-b2ed-4fde-9b4b-1f2aeba338d3" },
  { nummer: "1816", featureId: "f97a23b9-4d66-4796-9aee-f9e06d5eb9ca" },
  { nummer: "3228", featureId: "9c2dca34-8f37-4a68-91bf-5983c18b40a3" },
  { nummer: "5510", featureId: "cb8b5dc4-2e75-476d-988f-9f4b1307d8f0" },
  { nummer: "3431", featureId: "4bf79306-89f1-4b09-a566-f246932e74f1" },
  { nummer: "5501", featureId: "2f105ea7-e1dc-48e5-af76-09dbb920db0d" },
  { nummer: "1516", featureId: "75642bdd-fd9e-45d9-b9f2-f47432738fed" },
  { nummer: "5057", featureId: "6275c2e1-b61c-4ad6-8322-a043201c9820" },
  { nummer: "4012", featureId: "b54ccf70-e272-4151-9700-7f80ce70cb38" },
  { nummer: "3330", featureId: "0a511fd7-9fb7-4bff-8322-6b720461c34a" },
  { nummer: "3425", featureId: "b4732779-db16-478c-b95d-0e0f1d470ba6" },
  { nummer: "3120", featureId: "f9b0d8a0-4a00-4353-9a28-10e0f91f515e" },
  { nummer: "4223", featureId: "24d908d1-655e-4cfd-9f06-d94dae84b43a" },
  { nummer: "3420", featureId: "3cd9325d-771b-427b-a4c0-85068ee74cbb" },
  { nummer: "1124", featureId: "5bf20af1-5430-45a8-b4df-6c50bc30ebb1" },
  { nummer: "3909", featureId: "6de61215-35a5-49a9-b71b-32223dff8843" },
  { nummer: "4215", featureId: "e5e35a7f-53c6-4ef4-b5b1-38796d9f00d8" },
  { nummer: "3114", featureId: "9f5a089b-9f44-44d9-926c-96e03732e7ef" },
  { nummer: "5021", featureId: "4cfc3ece-65b6-4c17-adde-b3bede393630" },
  { nummer: "5032", featureId: "312ece6e-6f7a-4c85-94bc-a529b5bdc24d" },
  { nummer: "1134", featureId: "0c229077-33b4-4815-b172-29b67cd43b1c" },
  { nummer: "5632", featureId: "88a5d065-bb43-4e0e-8d0b-bca963d062aa" },
  { nummer: "1837", featureId: "4ad19919-9e2b-4d0c-b9f0-c0c9d78f3b93" },
  { nummer: "1875", featureId: "32b7a1d8-b69c-4fe9-b2e1-faef314947cd" },
  { nummer: "1860", featureId: "8fd2c6df-babc-4a49-ac5b-afdd390518d5" },
  { nummer: "1515", featureId: "1ab3cedd-013f-487a-9e8c-9a7f2c6f5354" },
  { nummer: "3433", featureId: "17b84acb-5f26-45ee-a0aa-728a32c95f84" },
  { nummer: "1840", featureId: "24f92d31-e356-4e57-97a7-5bf1776ddd0a" },
  { nummer: "1576", featureId: "970cfdc1-1760-4e05-995a-c889068cac44" },
  { nummer: "1114", featureId: "b3e95560-b2c2-4f41-b51e-9c90b487fec0" },
  { nummer: "3201", featureId: "42ec0811-e0e3-42bb-9645-293057222601" },
  { nummer: "3911", featureId: "926f576c-0db6-4b98-805f-2932ba914baf" },
  { nummer: "4032", featureId: "2e32159b-6a67-4baf-8cd9-0b3899f43d72" },
  { nummer: "1578", featureId: "92691e1b-3b86-40ad-851e-f3899f43508e" },
  { nummer: "4614", featureId: "8fe8934c-b2c2-496d-ae64-2cf37495742b" },
  { nummer: "4629", featureId: "f1b48c72-2140-4129-b2d3-b2f857651f3d" },
  { nummer: "3446", featureId: "6c179cd5-1d65-45df-b522-99168b93a84e" },
  { nummer: "1103", featureId: "837791de-4014-4e8a-a3de-ac2044befe2c" },
  { nummer: "4639", featureId: "0ed5809d-d04a-45cf-b3ba-04998790444e" },
  { nummer: "5512", featureId: "383eb054-bb62-4e65-8707-28f905a2d995" },
  { nummer: "4001", featureId: "1796b772-f145-4c22-a613-47b0be9a85c9" },
  { nummer: "5059", featureId: "63b2a030-fa63-4355-b563-706279f9c240" },
  { nummer: "3423", featureId: "95d47c84-7d5c-4ad6-b05c-3f2e3ec80f82" },
  { nummer: "3336", featureId: "fa62d974-11c6-438b-a9af-786cd76f3474" },
  { nummer: "5636", featureId: "0ef8e159-6830-4920-869a-83ffdd074340" },
  { nummer: "4635", featureId: "9e5777cd-53da-45e1-9d53-43a0f08d9fc1" },
  { nummer: "3905", featureId: "bc7b84b8-b363-4588-8cf6-3c370afc1e1c" },
  { nummer: "5514", featureId: "6756c184-c5d6-4e90-aed1-eb4bc61f387d" },
  { nummer: "4613", featureId: "64df7598-63d0-4d44-81c6-f5a0780bd9d4" },
  { nummer: "1828", featureId: "98f11f45-4ebe-4e54-9dd5-cb9bebf81cda" },
  { nummer: "1827", featureId: "68e7bac8-f3ff-4cca-b98b-4e69782d6a2d" },
  { nummer: "5601", featureId: "c55aac2c-1107-4ed4-b107-0abf90c820db" },
  { nummer: "3312", featureId: "4c57eb86-6eb4-424d-9909-3473ac61918d" },
  { nummer: "4211", featureId: "0f682c0f-c483-4ebf-9dd9-32c75b4caaa1" },
  { nummer: "3441", featureId: "600326ee-11ae-4d9d-bbaf-2ab459540995" },
  { nummer: "1811", featureId: "d509d684-84c1-4fdb-a2c4-639dbd55df9e" },
  { nummer: "4630", featureId: "1cabf42b-692c-413e-ac59-fa810cef7d1f" },
  { nummer: "1560", featureId: "3f60ce31-325d-4d4a-b023-57ce48f695ec" },
  { nummer: "1535", featureId: "3e4c0835-3425-4f81-8cee-b047d5c559d4" },
  { nummer: "4024", featureId: "82d4c807-e1cd-4941-9015-8c0d7960ced5" },
  { nummer: "4221", featureId: "76f0d01d-8f55-4360-b240-952bb85dddff" },
  { nummer: "5620", featureId: "324a56a6-94b2-4511-aa96-f2a4bbd6fc22" },
  { nummer: "3124", featureId: "3e0e7fb7-a067-4e5c-be22-ad58c7124d63" },
  { nummer: "4619", featureId: "3992cb86-5b7f-4a9d-987b-ea997025b24d" },
  { nummer: "5616", featureId: "afbc50e6-bb92-4bb4-bcdb-fc83e1e7e444" },
  { nummer: "4014", featureId: "38b30a93-d01a-4939-8aa5-9190ced93162" },
  { nummer: "5534", featureId: "64484c75-ecbe-4b32-bbd5-57022e2bb425" },
  { nummer: "3118", featureId: "f19e7d46-1a86-4cbb-b262-3fdfeb7a31ab" },
  { nummer: "3314", featureId: "dbd6250b-1b53-4c6f-8e41-f1b7ba4d3e91" },
  { nummer: "4028", featureId: "32e90869-c2ce-4390-9efb-93965e44a2ac" },
  { nummer: "1525", featureId: "d0289985-41ff-4f2a-8eb1-2b41d9f6879c" },
  { nummer: "3338", featureId: "d4000778-bb1d-4f8c-a0d2-7788d5dda5c3" },
  { nummer: "4214", featureId: "b69eddc8-cbd7-44df-a80c-a1cf6601e521" },
  { nummer: "1838", featureId: "76285d74-fed7-4c42-82d8-792dcaaf2c3e" },
  { nummer: "1825", featureId: "287b1925-357d-49b5-93e4-e57f1c6c48b4" },
  { nummer: "4649", featureId: "8f8498b7-16fe-4793-a8f4-45c17d026f76" },
  { nummer: "3310", featureId: "f4cc75d3-031e-48c7-ba78-66df9002c07a" },
  { nummer: "1146", featureId: "37ef1fcd-1a99-4f6c-bee4-41c70b8fc1cb" },
  { nummer: "4636", featureId: "dadfaa2a-7413-4fb4-a6f5-aa3b5dbf0507" },
  { nummer: "5610", featureId: "acbef55a-a616-4845-ab4f-a5a9ea6b0e98" },
  { nummer: "4022", featureId: "d0978550-67a8-4af7-9c21-1ca80f6bdbfa" },
  { nummer: "1820", featureId: "6373f185-3ea5-4843-96cf-90c46ae7d8fe" },
  { nummer: "4612", featureId: "a98555c9-41fd-453a-bdd5-560fe23930d0" },
  { nummer: "3105", featureId: "ce0fae43-1f8d-4da4-97b4-4a4961e923c0" },
  { nummer: "4642", featureId: "6a2d3b05-202e-4f35-bb90-340c95610edb" },
  { nummer: "4622", featureId: "c380ea63-1619-400b-8d47-dede3749f5b8" },
  { nummer: "3421", featureId: "ff289cbb-14c8-4c74-8a31-896b2c175667" },
  { nummer: "3322", featureId: "23c8a246-2a22-4217-bc32-519e97b45f00" },
  { nummer: "3401", featureId: "1b838adc-5167-4b55-a773-fadbadee84b2" },
  { nummer: "5626", featureId: "29818c5a-4baa-4ca9-98a5-8b78ab00877a" },
  { nummer: "4203", featureId: "ee718989-7390-42d1-96fd-29b5e2615439" },
  { nummer: "3417", featureId: "44af1277-ae62-491c-9918-23fba520b954" },
  { nummer: "3448", featureId: "75c667c6-5e04-48ed-9bfe-1da57bf18390" },
  { nummer: "5530", featureId: "8d1e0a0a-5bd0-4a21-8e5b-bd3cb2a0d4b7" },
  { nummer: "3430", featureId: "ab1646a5-afb3-4c8b-8045-ce233ec8c039" },
  { nummer: "1532", featureId: "d524ccd1-48fd-435d-ab78-75bc0c7bc2a7" },
  { nummer: "1833", featureId: "3f2b552c-2a55-4fb4-b9a8-cea2a2e45406" },
  { nummer: "3907", featureId: "ac7e05cd-fb07-4270-ad95-e3c32c1370d0" },
  { nummer: "3209", featureId: "1ca0f13d-e85d-44fe-897d-82b3dd555c1a" },
  { nummer: "4633", featureId: "551c1982-1434-450e-a8fe-2b79cd62b1db" },
  { nummer: "3116", featureId: "9948d9bd-c661-41d0-b47e-cb077fe231b9" },
  { nummer: "3218", featureId: "74273193-b926-40e1-959e-e02c3942dc81" },
  { nummer: "5536", featureId: "e294e1ca-10fc-471e-885f-27fc5e027620" },
  { nummer: "3220", featureId: "afb7764a-6c5a-4a0a-94fe-e02d3390d5a4" },
  { nummer: "4618", featureId: "511c60a9-d307-4c31-ac25-781af6330c27" },
  { nummer: "5037", featureId: "91b6bbc7-e889-43cc-85ac-f6a2b9b47d39" },
  { nummer: "1108", featureId: "41bd2013-db58-4f41-ba1e-d47a61c39088" },
  { nummer: "5603", featureId: "778bf04f-6b8c-4c43-8c9d-de7f6777635b" },
  { nummer: "5058", featureId: "eb193bc4-8fe7-475e-80e1-596559a90945" },
  { nummer: "4648", featureId: "d5f5bcef-38b4-4bb5-93b8-cb68bf34746b" },
  { nummer: "1853", featureId: "4cf12380-708e-4879-b161-8d09ae2bfda3" },
  { nummer: "3449", featureId: "7ff82dc8-0271-4e0f-a758-cee0292b8ceb" },
  { nummer: "3226", featureId: "d0b3686c-fad0-45d4-bc87-c3c5528ee601" },
  { nummer: "3112", featureId: "ea20afc9-b122-4996-b5ec-291a8cf8a879" },
  { nummer: "5622", featureId: "ecbd9c3f-4780-4581-92a6-21d443226bac" },
  { nummer: "4643", featureId: "e7c86115-3d9e-43e6-82fb-c2c05f4c215e" },
  { nummer: "3122", featureId: "4df569ef-5dfd-4534-b057-7caf2fe8d49d" },
  { nummer: "3438", featureId: "3509e7d4-20e1-45d0-95aa-96cdbcc89928" },
  { nummer: "4030", featureId: "c407bca0-3d6a-4bcd-8423-fa46adf31267" },
  { nummer: "3415", featureId: "c8cf8dce-0b85-45a2-968c-a17942dd64b4" },
  { nummer: "5001", featureId: "716abf9b-ecff-411a-a0f9-542e7e0debba" },
  { nummer: "3403", featureId: "13900f60-1c4a-4a21-9dd2-37efbcecce02" },
  { nummer: "5518", featureId: "97e07234-6c9b-4b9f-a685-3a016d39b302" },
  { nummer: "5014", featureId: "c0109514-1ba9-49a2-9063-15e89cb03e55" },
  { nummer: "3232", featureId: "e05680be-2c9d-4aac-9cb7-a65cba8a532f" },
  { nummer: "4226", featureId: "04640fc1-a9a2-449a-b5b7-0dc8ea50dd32" },
  { nummer: "5520", featureId: "3a7a9b3e-a6a9-4ef7-bc4e-0f1083a8de1a" },
  { nummer: "1547", featureId: "75bac93e-de89-4bc1-a0d4-775cdcf8f423" },
  { nummer: "3320", featureId: "0db85919-28bf-4d3c-8972-130b0fb5376e" },
  { nummer: "3107", featureId: "1e84e1f2-4a95-4d04-9651-c68318d93127" },
  { nummer: "1149", featureId: "a7321f05-33bb-4df6-99e2-0787142b8e83" },
  { nummer: "5044", featureId: "f683728d-d5e1-49f3-80d4-23f2f0c9e61f" },
  { nummer: "3427", featureId: "73c8e158-0d23-4143-9024-9aa56c24c31c" },
  { nummer: "3318", featureId: "ff08a39d-37f4-4543-b0f7-64d45dc88323" },
  { nummer: "4651", featureId: "5e2d6b0d-ad7d-4de9-88ff-f57f591aaef8" },
  { nummer: "3242", featureId: "a1c460d1-b050-4c59-b309-eb5cdc8de2ff" },
];

var fylkeFeatureIds = [
  { nummer: "46", featureId: "33b5940c-93c4-40cc-8931-64086e7d49e7" },
  {
    nummer: "31",
    featureId:
      "f2e85556-471b-4807-a1bf-6da7478e7cda914583e6d0e77220dea228cdea74712a38111031ff5827aa22a4fcc573775871",
  },
  {
    nummer: "56",
    featureId:
      "545cbfe3-2f34-4792-a9e9-135375accefdebb65dc07a6aac7e6fbba753102529da11054da16b8fbd950aef94cc9b657aa3",
  },
  { nummer: "11", featureId: "e70c69ba-5bea-48a8-952c-b4860ada5afa" },
  { nummer: "42", featureId: "3a65f9e4-23d5-4c05-b188-8f4ea8463f8b" },
  { nummer: "50", featureId: "ea3b82cf-f063-41a9-a19c-449832aadf3a" },
  { nummer: "18", featureId: "ee7fa255-8172-47f2-8f83-6076ccf1bb4f" },
  { nummer: "15", featureId: "ab9f3402-23fb-48b4-a4fd-dbe4e3cc321b" },
  {
    nummer: "33",
    featureId:
      "f2e85556-471b-4807-a1bf-6da7478e7cda3c5b30b7413109f2131ee2bc277b7497e1a7b78b1ef01a7f06a4da87c29065cd",
  },
  {
    nummer: "39",
    featureId:
      "22642144-2de8-4e9d-bea0-0520fb44e85a3727684b2f77b1c2723e9c2b0557eb052581ea5f433a08dfc45767bd6f8ffc22",
  },
  { nummer: "03", featureId: "6fa6cac4-9f86-4cbf-9ae4-716eb5059541" },
  { nummer: "34", featureId: "f96e22cd-cd45-48a3-99b8-a3d5b78c76b4" },
  {
    nummer: "55",
    featureId:
      "545cbfe3-2f34-4792-a9e9-135375accefd4d900b2e65d389acba662b975bc54788ada6010ce13a7541dc362af40509ba88",
  },
  {
    nummer: "40",
    featureId:
      "22642144-2de8-4e9d-bea0-0520fb44e85a33c2d92b5c2121efc91a2bd25a57d1f418bccbe87e89c4f06d593f51312adf36",
  },
  {
    nummer: "32",
    featureId:
      "f2e85556-471b-4807-a1bf-6da7478e7cdaf15db7200cf8abf6c515fa75763bd104ebdbcfeeea6516f4ba2e274c8f8d3e5d",
  },
];

function findMomentCentroid(coordinateArray) {
  var xSum = 0;
  var ySum = 0;
  var area = 0;

  coordinateArray.forEach((polygon) => {
    const numPoints = polygon[0].length;
    for (let i = 0; i < numPoints - 1; i++) {
      const xi = polygon[0][i][0];
      const yi = polygon[0][i][1];
      const xiPlus1 = polygon[0][i + 1][0];
      const yiPlus1 = polygon[0][i + 1][1];

      const ai = xi * yiPlus1 - xiPlus1 * yi; // Cross-product to calculate the area of the triangle
      area += ai;
      xSum += (xi + xiPlus1) * ai; // Accumulate sum of moments along x-axis
      ySum += (yi + yiPlus1) * ai; // Accumulate sum of moments along y-axis
    }
  });

  area /= 2; // The area calculated will be twice the actual area, so we divide by 2

  var centroidX = xSum / (6 * area); // Calculate centroid's x-coordinate
  var centroidY = ySum / (6 * area); // Calculate centroid's y-coordinate

  return [centroidX, centroidY, area];
}

async function fetchGeoJSON(nummer, featureId) {
  const switchValue = nummer.length;
  switch (switchValue) {
    case 4:
      var apiLink = `https://ogcapi-stemmekretser.kartverket.no/collections/kommuner/items/${featureId}?crs=http%3A%2F%2Fwww.opengis.net%2Fdef%2Fcrs%2FEPSG%2F0%2F${selectedCoordsys}&f=json&lang=nb-NO`;
      break;
    case 2:
      var apiLink = `https://ogcapi-stemmekretser.kartverket.no/collections/fylker/items/${featureId}?crs=http%3A%2F%2Fwww.opengis.net%2Fdef%2Fcrs%2FEPSG%2F0%2F${selectedCoordsys}&f=json&lang=nb-NO`;
      break;
    default:
      console.error("Unknown error.");
  }
  try {
    const response = await fetch(apiLink);
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch GeoJSON data");
    }
    var geojsonData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  if (geojsonData.geometry.type == "MultiPolygon") {
    var coordinates = geojsonData.geometry.coordinates;
  } else {
    var coordinates = [geojsonData.geometry.coordinates];
    geojsonData.type = "MultiPolygon";
  }
  geojsonData.coordinates = coordinates;

  return geojsonData;
}

const selectedCoordsys = "25833";

var municipalityCentroids = [];
var countyCentroids = [];

var municipalityAreas = [];
var countyAreas = [];

var data = [["number", "name", "area", "centroidX", "centroidY"]];

function arrayToCSV(data) {
  return data.map((row) => row.join(",")).join("\n");
}

async function processData() {
  for (let [index, kommune] of kommuneFeatureIds.entries()) {
    console.log(
      `Processing municipality #${index + 1} of ${kommuneFeatureIds.length}`
    );
    var geojsonData = await fetchGeoJSON(kommune.nummer, kommune.featureId);
    var [centroidX, centroidY, area] = findMomentCentroid(
      geojsonData.coordinates
    );
    var kommunenavn = geojsonData.properties.kommunenavn;
    var datapoint = [
      kommune.nummer,
      kommunenavn,
      area.toFixed(0),
      centroidX.toFixed(0),
      centroidY.toFixed(0),
    ];
    municipalityCentroids.push([centroidX, centroidY]);
    municipalityAreas.push(area);
    data.push(datapoint);
  }

  for (let [index, fylke] of fylkeFeatureIds.entries()) {
    console.log(`Processing county #${index + 1} of ${fylkeFeatureIds.length}`);
    var geojsonData = await fetchGeoJSON(fylke.nummer, fylke.featureId);
    var [centroidX, centroidY, area] = findMomentCentroid(
      geojsonData.coordinates
    );
    var fylkesnavn = geojsonData.properties.fylkesnavn;
    var datapoint = [
      fylke.nummer,
      fylkesnavn,
      area.toFixed(0),
      centroidX.toFixed(0),
      centroidY.toFixed(0),
    ];
    countyCentroids.push([centroidX, centroidY]);
    countyAreas.push(area);
    data.push(datapoint);
  }

  const sumMunicAreas = municipalityAreas.reduce((acc, val) => acc + val, 0);
  const sumCountyAreas = countyAreas.reduce((acc, val) => acc + val, 0);

  const municCentroidX = (
    municipalityCentroids
      .map((innerArray, index) => innerArray[0] * municipalityAreas[index])
      .reduce((acc, val) => acc + val, 0) / sumMunicAreas
  ).toFixed(0);
  const municCentroidY = (
    municipalityCentroids
      .map((innerArray, index) => innerArray[1] * municipalityAreas[index])
      .reduce((acc, val) => acc + val, 0) / sumMunicAreas
  ).toFixed(0);
  const countCentroidX = (
    countyCentroids
      .map((innerArray, index) => innerArray[0] * countyAreas[index])
      .reduce((acc, val) => acc + val, 0) / sumCountyAreas
  ).toFixed(0);
  const countCentroidY = (
    countyCentroids
      .map((innerArray, index) => innerArray[1] * countyAreas[index])
      .reduce((acc, val) => acc + val, 0) / sumCountyAreas
  ).toFixed(0);

  console.log(
    `Using municipality GeoJSONs, the moment centroid of Norway is at (${municCentroidY} N, ${municCentroidX} E) (UTM33)`
  );
  console.log(
    `Using county GeoJSONs, the moment centroid of Norway is at (${countCentroidY} N, ${countCentroidX} E) (UTM33)`
  );

  const csv = arrayToCSV(data);

  return new Promise((resolve, reject) => {
    fs.writeFile(`subdiv_centroids_v2.csv`, csv, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

processData()
  .then(() => {
    console.log("CSV file saved successfully.");
  })
  .catch((err) => {
    console.error("Error writing CSV file:", err);
  });
