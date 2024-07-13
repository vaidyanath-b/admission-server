create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
as $$
  declare
    claims jsonb;
    role admission."Role";
  begin
    -- Check if the user is marked as admin in the profiles table
    select role into role from admission.profile where id = (event->>'user_id')::uuid;

    -- Proceed only if the user is an admin
      claims := event->'claims';

      -- Check if 'app_metadata' exists in claims
      if jsonb_typeof(claims->'app_metadata') is null then
        -- If 'app_metadata' does not exist, create an empty object
        claims := jsonb_set(claims, '{app_metadata}', '{}');
      end if;

      -- Set a claim of 'admin'
      claims := jsonb_set(claims, '{app_metadata, admin}', role);

      -- Update the 'claims' object in the original event
      event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon, public;

grant all
  on table admission.profile
  to supabase_auth_admin;

revoke all
  on table admission.profile
  from authenticated, anon, public;
