ALTER TABLE shop_settings ADD COLUMN IF NOT EXISTS calendar_open text NOT NULL DEFAULT '11:00';
ALTER TABLE shop_settings ADD COLUMN IF NOT EXISTS calendar_close text NOT NULL DEFAULT '20:00';
ALTER TABLE shop_settings ADD COLUMN IF NOT EXISTS calendar_step_min smallint NOT NULL DEFAULT 15 CHECK (calendar_step_min IN (15,30));
ALTER TABLE shop_settings ADD COLUMN IF NOT EXISTS allow_staff_overlaps boolean NOT NULL DEFAULT false;
CREATE TABLE IF NOT EXISTS staff_schedule_overrides (
  staff_id uuid NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  business_day date NOT NULL,
  works boolean NOT NULL DEFAULT true,
  shifts jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (staff_id,business_day)
);
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_no_overlap;
CREATE INDEX IF NOT EXISTS staff_schedule_overrides_day_idx ON staff_schedule_overrides(business_day);
