-- CreateTable
CREATE TABLE "account" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "externalId" TEXT,
    "type" TEXT NOT NULL,
    "dateInsert" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account.type_externalId_unique" ON "account"("type", "externalId");

INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (1, 'Test0', '0Zero', 'GROUP1', '2021-03-23 09:39:01.357');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (6, 'Test1', '1One', 'GROUP1', '2021-03-24 08:49:43.804');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (8, 'Test2', '2Two', 'GROUP1', '2021-03-24 08:50:36.922');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (9, 'Test3', '3Three', 'GROUP1', '2021-03-25 08:52:22.116');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (11, 'Test4', '4Four', 'GROUP2', '2021-03-25 08:52:47.519');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (13, 'Test5', '5Five', 'GROUP2', '2021-03-25 09:00:33.071');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (15, 'Test6', '6Six', 'GROUP2', '2021-03-26 09:02:49.197');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (5, 'Test7', '7Seven', 'GROUP3', '2021-03-26 10:17:35.658');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (19, 'Test8', '8Eight', 'GROUP3', '2021-03-26 15:37:45.038');
INSERT INTO public.account (id, name, "externalId", type, "dateInsert") VALUES (29, 'Test9', '9Nine', 'GROUP3', '2021-03-27 16:55:28.930');
