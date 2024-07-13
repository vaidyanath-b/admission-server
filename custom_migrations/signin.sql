-- 1. Create the public.profiles table
create or replace function auth.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into admission."User" (id,email)
  values (new.id , new.email);
  insert into  admission.profile (id)
  values (new.id);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
after insert on auth.users
  for each row execute procedure auth.handle_new_user();