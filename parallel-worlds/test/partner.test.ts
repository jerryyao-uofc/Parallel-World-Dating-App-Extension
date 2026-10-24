import { describe, expect, it } from 'vitest';
import { scenarioFromPartner } from '../shared/partner';
import { buildContext } from '../server/orchestrator';
import { buildHiggsConfig } from '../server/higgs';

describe('dating partner voice', () => {
  it('uses the avatar preset for the live date', () => {
    const scenario = scenarioFromPartner({ name: 'Amara', voice: 'chloe' });
    expect(scenario?.character.voice).toBe('chloe');
    const config = buildHiggsConfig(buildContext(scenario!));
    expect(config.session.audio.output.voice).toBe('chloe');
  });

  it('ignores a voice that is not a preset', () => {
    expect(scenarioFromPartner({ name: 'Amara', voice: 'not-a-voice' })?.character.voice).toBe('default');
  });
});
