ALTER TABLE "materials" RENAME COLUMN "content" TO "raw_content";--> statement-breakpoint
ALTER TABLE "materials" RENAME COLUMN "url" TO "link_url";--> statement-breakpoint
ALTER TABLE "materials" DROP CONSTRAINT "materials_notebook_id_notebooks_id_fk";
--> statement-breakpoint
ALTER TABLE "decks" DROP CONSTRAINT "decks_notebook_id_notebooks_id_fk";
--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "file_url" text;--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "processed_text_content" text;--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "decks" ADD COLUMN "material_id" uuid;--> statement-breakpoint
ALTER TABLE "flashcards" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_notebook_id_notebooks_id_fk" FOREIGN KEY ("notebook_id") REFERENCES "public"."notebooks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decks" ADD CONSTRAINT "decks_material_id_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decks" ADD CONSTRAINT "decks_notebook_id_notebooks_id_fk" FOREIGN KEY ("notebook_id") REFERENCES "public"."notebooks"("id") ON DELETE cascade ON UPDATE no action;