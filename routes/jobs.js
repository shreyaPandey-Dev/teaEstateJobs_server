import express from "express";
import { db } from "../db.js";

const router = express.Router();

/**
 * GET all active jobs
 */
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * 
      FROM tea_jobs.jobs
      WHERE is_active = true
      ORDER BY posted_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * CREATE job
 */
router.post("/", async (req, res) => {
  const {
    title,
    description,
    company_name,
    tea_estate_name,
    location,
    state,
    country,
    salary,
    job_type,
    experience_level,
    contact_email,
    contact_phone,
    apply_link,
    source
  } = req.body;

  try {
    const result = await db.query(
      `
      INSERT INTO tea_jobs.jobs (
        title,
        description,
        company_name,
        tea_estate_name,
        location,
        state,
        country,
        salary,
        job_type,
        experience_level,
        contact_email,
        contact_phone,
        apply_link,
        source,
        is_active,
        posted_at,
        created_at
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,
        true,
        NOW(),
        NOW()
      )
      RETURNING *
      `,
      [
        title,
        description,
        company_name,
        tea_estate_name,
        location,
        state,
        country,
        salary,
        job_type,
        experience_level,
        contact_email,
        contact_phone,
        apply_link,
        source
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;