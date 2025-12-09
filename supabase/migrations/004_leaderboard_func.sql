-- Migration 004: Leaderboard Calculation Function

CREATE OR REPLACE FUNCTION public.get_team_leaderboard(p_team_id UUID)
RETURNS TABLE (
  user_id UUID,
  score BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER -- Run as owner to ensure we can read logs (RLS should ideally allow it, but this simplifies aggregation)
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    al.user_id,
    SUM(
      CASE 
        WHEN al.type = 'task_completed' THEN 50
        WHEN al.type = 'event_created' THEN 20
        WHEN al.type = 'event_attended' THEN 30
        WHEN al.type = 'message_sent' THEN 5
        ELSE 0
      END
    )::BIGINT as score
  FROM public.activity_log al
  WHERE al.team_id = p_team_id
  GROUP BY al.user_id
  ORDER BY score DESC;
END;
$$;
