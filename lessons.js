const theory = [
  { id:'intro', th:'เริ่มต้น', en:'Introduction', title:'ทฤษฎีดนตรีบนคอกีตาร์', intro:'จับกีตาร์แล้วลองฟังว่าโน้ต จังหวะ และคอร์ดทำงานด้วยกันอย่างไร คู่มือนี้เริ่มจากสายเปล่ากับเฟรตเดียว แล้วพาไปถึงการเลือกสเกลและโหมดสำหรับริฟฟ์หรือโซโล่ร็อกและเมทัล',
    body:`<h2>เริ่มจากเสียงที่คุณเล่นอยู่แล้ว</h2>
    <p>ลองเล่นสาย 6 เปิดเสียง E สลับกับเฟรต 3 เสียง G แล้วกลับมาจบที่ E คุณเพิ่งใช้คู่เสียง E–G ซึ่งห่างกันสามครึ่งเสียง พอเติม B เข้าไป คุณจะได้ชุดโน้ตของคอร์ด Em</p>
    <p>ถ้ากำลังฝึกโซโล่ด้วย D minor pentatonic ให้ลองเล่นวลีสั้น ๆ แล้วจบที่ D จากนั้นเล่นวลีเดิมแต่จบที่ F ฟังว่าสองแบบให้ความรู้สึกต่างกันอย่างไร หลักเดียวกันนี้จะกลับมาในบทเรื่องคีย์และโหมด</p>
    <div class="note"><strong>วิธีใช้คู่มือ</strong><p>เลือกบทจากสารบัญ หรือเริ่มที่คำศัพท์แล้วเรียนตามลำดับ เมื่อเข้าใจตัวอย่างแล้ว กดบันทึกว่าเรียนจบเพื่อกลับมาเรียนต่อบนเบราว์เซอร์เดิม</p></div>
    <p class="credit">สารบัญอ้างอิงจาก <a href="https://bradleyhallsguitarschool.com/guide" target="_blank" rel="noopener">The Ultimate Music Theory Guide ของ Bradley Hall ↗</a> เนื้อหาและแบบฝึกเรียบเรียงใหม่เป็นภาษาไทย</p>`,
    lab:'scale', preset:'Minor Pentatonic' },
  { id:'terms', th:'คำศัพท์', en:'Terms', title:'คำศัพท์ที่เจอบ่อย', intro:'ใช้คำเหล่านี้อ่านสูตรสเกล คุยเรื่องริฟฟ์ และนับจังหวะกับมือกลอง',
    body:`<dl class="definitions">
    <div><dt>Semitone / Tone</dt><dd>ครึ่งเสียงเท่ากับการขยับหนึ่งเฟรตบนสายเดียวกัน หนึ่งเสียงเต็มเท่ากับสองเฟรต เช่น E → F → F♯</dd></div>
    <div><dt>Octave</dt><dd>โน้ตชื่อเดียวกันที่อยู่ห่างกัน 12 ครึ่งเสียง สาย 6 เปล่ากับเฟรต 12 เป็น E คนละอ็อกเทฟ</dd></div>
    <div><dt>Root / Tonic</dt><dd>Root คือโน้ตที่ใช้ตั้งชื่อคอร์ด เช่น G ใน G7 ส่วน tonic คือศูนย์กลางของคีย์ เช่น C ในคีย์ C major</dd></div>
    <div><dt>Sharp ♯ / Flat ♭</dt><dd>เพิ่มหรือลดจากโน้ตตามชื่อครึ่งเสียง เช่น C♯ สูงกว่า C หนึ่งเฟรต และ B♭ ต่ำกว่า B หนึ่งเฟรต</dd></div>
    <div><dt>Melody / Harmony</dt><dd>Melody คือทำนองที่ได้ยินเป็นวลี ส่วน harmony คือความสัมพันธ์ของเสียงที่เกิดร่วมกัน เช่น เสียงร้องกับคอร์ดประกอบ</dd></div>
    <div><dt>Degree</dt><dd>ลำดับขั้นของโน้ตจากตัวตั้งต้น เช่น G เป็นขั้น 5 ของ C major ส่วน ♭3 ในสูตรอิง major หมายถึงลดขั้น 3 ลงครึ่งเสียง</dd></div>
    <div><dt>Arpeggio</dt><dd>เล่นโน้ตในคอร์ดทีละตัว เช่น A–C–E–C จากคอร์ด Am</dd></div>
    <div><dt>Bar / Tempo</dt><dd>Bar คือห้องเพลง ส่วน tempo คือความเร็วของจังหวะที่วัดเป็น BPM เช่น 120 BPM เท่ากับสองจังหวะต่อวินาที</dd></div>
    <div><dt>Modulation</dt><dd>การเปลี่ยนคีย์ระหว่างเพลง เช่น ย้ายท่อนฮุกสุดท้ายจาก C major ไป D major</dd></div>
    <div><dt>Diatonic / Chromatic / Passing tone</dt><dd>โน้ต diatonic อยู่ในชุดโน้ตที่ใช้อ้างอิง ส่วน chromatic อาจออกนอกชุดนั้น เช่น C♯ ในวลี C–C♯–D ของคีย์ C major ทำหน้าที่เป็นโน้ตผ่าน</dd></div></dl>` },
  { id:'intervals', th:'ขั้นคู่', en:'Intervals', title:'ขั้นคู่และระยะห่างของเสียง', intro:'นับจำนวนครึ่งเสียงเพื่อหาตำแหน่งบนกีตาร์ และดูชื่อโน้ตเพื่อเรียกขั้นคู่ให้ตรงกับบริบท',
    body:`<h2>หนึ่งเฟรตเท่ากับหนึ่งครึ่งเสียง</h2><p>ถ้าเริ่มจาก E บนสาย 6 เฟรต 0 แล้วขยับไปเฟรต 7 จะได้ B ซึ่งเป็น perfect fifth ใช้คู่นี้เล่น power chord แบบ E5 ได้</p>
    <div id="interval-table"></div>
    <div class="note"><strong>เฟรตเดียวกันอาจสะกดได้สองแบบ</strong><p>จาก C ไป F♯ เป็น augmented fourth เพราะ C–D–E–F นับได้สี่ชื่อโน้ต จาก C ไป G♭ เป็น diminished fifth เพราะนับได้ห้าชื่อ ทั้งคู่ห่างหกครึ่งเสียงบนกีตาร์ ส่วน augmented fifth กับ minor sixth ห่างแปดครึ่งเสียงเท่ากัน เช่น C–G♯ กับ C–A♭ ชื่อบอกว่ากำลังฟังขั้นไหน ใน C Lydian จะพบ F♯ ขณะที่ Cdim มี G♭ และ Caug มี G♯</p></div>
    <h2>ฝึกฟังและอ่านแผนภาพ</h2><p>เลือกขั้นคู่ด้านบน กดฟังแล้วฮัมเสียงที่สองก่อนหาบนกีตาร์ เริ่มจาก 3 กับ ♭3 และ 5 กับ ♭5 เมื่อเห็นสัญลักษณ์ R, P, M และ m ในแผนภาพอื่น ให้อ่านว่า root, perfect, major และ minor ตามลำดับ</p>`, lab:'interval' },
  { id:'keys', th:'คีย์', en:'Keys', title:'หาโน้ตที่เป็นศูนย์กลาง', intro:'คีย์ช่วยอธิบายว่าเพลงมีศูนย์กลางเสียงอยู่ที่ไหน และคอร์ดหรือทำนองพาเรากลับไปหาเสียงนั้นอย่างไร',
    body:`<h2>ลองหาโน้ตบ้านด้วยหู</h2><ol><li>ฟังโน้ตเบสตอนท้ายวลีหรือช่วงที่ริฟฟ์วนกลับมา</li><li>ฮัมโน้ตที่รู้สึกว่าจบได้ แล้วหาตำแหน่งบนกีตาร์</li><li>ลองเทียบขั้น 3 สองแบบ ถ้าโน้ตบ้านคือ E ให้ฟัง G กับ G♯ และดูว่าคอร์ดหรือทำนองเน้นตัวไหน</li></ol>
    <h2>โน้ตชุดเดียวกัน ศูนย์กลางคนละตัว</h2><p>C major และ A natural minor ใช้โน้ต C, D, E, F, G, A, B ร่วมกัน ลองเล่น C–F–G–C แล้วสลับเป็น Am–Dm–Em–Am เพื่อฟังว่าความรู้สึกตอนจบเปลี่ยนไปยังไง</p>
    <div class="note"><strong>ลองกับแบ็กกิงแทร็ก D minor</strong><p>เล่น D minor pentatonic ชุด D–F–G–A–C สร้างวลีสั้น ๆ แล้วลองจบที่ D ตอนคอร์ด Dm เข้าพอดี</p></div>
    <h2>เมื่อคอร์ดกำกวม ให้ฟังจุดลงจบ</h2><p>คอร์ด E–D–A อาจได้ยินเป็นการวนรอบ E แบบ Mixolydian หรือเป็น V–IV–I ใน A major ลองย้ำ E ในทำนองทั้งห้องแล้วเปรียบเทียบกับการพักที่ A ท้ายวลี</p>`, lab:'scale', preset:'Minor Pentatonic', root:2 },
  { id:'rhythm', th:'จังหวะ', en:'Rhythm', title:'จังหวะและการแบ่งบีต', intro:'ตั้งความเร็วเดียวกัน แล้วลองเปลี่ยนจำนวนครั้งที่ดีดในหนึ่งบีต คุณจะได้ความหนาแน่นของริฟฟ์ต่างกันทันที',
    body:`<h2 id="note-values">ค่าตัวโน้ต</h2><p>เมื่อ quarter note เท่ากับหนึ่งบีต เช่น ใน 4/4</p>
    <div class="table-wrap"><table><thead><tr><th>ตัวโน้ต</th><th>จำนวนบีต</th><th>ตัวอย่างการนับ</th></tr></thead><tbody><tr><td>Whole</td><td>4</td><td>ลากผ่าน 1 2 3 4</td></tr><tr><td>Half</td><td>2</td><td>ลากผ่าน 1 2</td></tr><tr><td>Quarter</td><td>1</td><td>1</td></tr><tr><td>Eighth</td><td>½</td><td>1 &amp;</td></tr><tr><td>Sixteenth</td><td>¼</td><td>1 e &amp; a</td></tr></tbody></table></div>
    <h2 id="note-modifiers">จุดประ วงโยง และสามพยางค์</h2><p><strong>Dot</strong> เพิ่มครึ่งหนึ่งของค่าเดิม เช่น dotted quarter ยาว 1½ บีต และ dotted half ยาว 3 บีต <strong>Tie</strong> รวมความยาวของโน้ตระดับเสียงเดียวกันโดยดีดครั้งเดียว <strong>Triplet</strong> แบ่งช่วงเวลาเดียวกันเป็นสามส่วนเท่ากัน เช่น eighth-note triplet สามตัวในหนึ่ง quarter-note beat ส่วน <strong>rest</strong> คือการเว้นเสียงตามความยาวที่กำหนด</p>
    <h2 id="time-signatures">Time signature</h2><p>เลขบนระบุจำนวนหน่วยในหนึ่งห้อง เลขล่างระบุชนิดตัวโน้ตที่ใช้เป็นหน่วย เช่น 3/4 มีสาม quarter notes และ 5/4 มีห้าโน้ตค่าเดียวกัน ส่วน 6/8, 7/8 และ 9/8 ใช้ eighth note เป็นหน่วย</p>
    <p>ลองนับ 3/4 เป็น <strong>หนึ่ง-สอง-สาม</strong> โดยแต่ละบีตแบ่งย่อยได้เป็นสอง ส่วน 6/8 มักรู้สึกเป็นสองบีตใหญ่ <strong>หนึ่ง-ละ-ลี สอง-ละ-ลี</strong> และ 7/8 ลองจัดกลุ่ม 2+2+3 ส่วน 9/8 มักเป็น 3+3+3 และ 12/8 มักเป็น 3+3+3+3 ลองเคาะเฉพาะตัวแรกของแต่ละกลุ่มเพื่อฟังบีตใหญ่</p>
    <div class="note"><strong>Gallop กับ triplet</strong><p>ลองนับ 1 e &amp; a แล้วดีดเฉพาะ 1, &amp;, a จะได้ gallop แบบ eighth + sixteenth + sixteenth ซึ่งมีระยะห่างไม่เท่ากัน เทียบกับ triplet ที่ดีดทั้งสามครั้งห่างเท่ากัน</p></div>`, lab:'rhythm' },
  { id:'chords', th:'คอร์ด', en:'Chords', title:'สร้างคอร์ดจากขั้นคู่', intro:'เริ่มจาก root แล้วเลือกขั้น 3 และขั้น 5 เสียงที่เลือกจะบอกว่าคอร์ดนั้นเป็น major, minor หรืออีกแบบหนึ่ง',
    body:`<h2>Triads และคอร์ดที่เจอบ่อย</h2><p>สูตรด้านล่างวัดจาก root โดยใช้ช่วงของ major scale เป็นหลัก เลข ♭3 จึงหมายถึงขั้น 3 ที่ต่ำลงหนึ่งครึ่งเสียง</p><div id="chord-table"></div>
    <h2 id="chord-extensions">Extensions และ add chords</h2><p>ขั้น 9, 11 และ 13 คือขั้น 2, 4 และ 6 เมื่อนับข้ามอ็อกเทฟ Cadd9 มี C–E–G–D ส่วน C9 มี B♭ เพิ่มมาด้วย เพราะมีโครงสร้างของ C7 อยู่ในคอร์ด</p>
    <h2 id="chord-inversions">Inversions และ voice leading</h2><p>ถ้าคอร์ด C มี E เป็นโน้ตต่ำสุด จะเขียน C/E และเรียกว่า first inversion ถ้า G อยู่ล่างสุดจะเป็น C/G หรือ second inversion คอร์ดเจ็ดมี third inversion เมื่อขั้น 7 อยู่ล่างสุด ลองเล่น C → G/B → Am เพื่อฟังเบสเดิน C–B–A</p>
    <h2 id="chord-progressions">Chord progressions</h2><p>สร้างไตรแอดโดยหยิบโน้ตเว้นตัวในสเกลจากแต่ละขั้น เช่น D–F–A เป็น Dm ในคีย์ C major ส่วน G–B–D เป็น G major</p>
    <div class="table-wrap"><table><thead><tr><th>คีย์</th><th>คอร์ดตามลำดับขั้น</th><th>ตัวอย่าง</th></tr></thead><tbody><tr><td>C major</td><td>C · Dm · Em · F · G · Am · Bdim</td><td>I–IV–V → C–F–G</td></tr><tr><td>A natural minor</td><td>Am · Bdim · C · Dm · Em · F · G</td><td>i–iv–v → Am–Dm–Em</td></tr></tbody></table></div>
    <h2 id="roman-numerals">อ่านเลขโรมัน</h2><p>เลขบอกขั้นของ root ตัวพิมพ์ใหญ่แทน major ตัวพิมพ์เล็กแทน minor เครื่องหมาย ° แทน diminished และ ø แทน half-diminished ถ้าใช้ major เป็นฐานอ้างอิง ให้ใส่ ♭ หน้าเลขเมื่อ root ต่ำกว่าขั้นนั้นครึ่งเสียง เช่น C เป็น ♭VI ใน E minor</p>
    <div class="table-wrap"><table><thead><tr><th>เลขโรมัน</th><th>ตัวอย่างคอร์ด</th></tr></thead><tbody><tr><td>ii–V–I ใน C</td><td>Dm → G → C</td></tr><tr><td>V–vi–vii° ใน C</td><td>G → Am → Bdim</td></tr><tr><td>i–iv–v ใน Em</td><td>Em → Am → Bm</td></tr><tr><td>♭III–♭VI–i ใน Em</td><td>G → C → Em</td></tr><tr><td>ii°–♭VII–♭VI ใน Em</td><td>F♯dim → D → C</td></tr></tbody></table></div>
    <p>ในคีย์ A minor คุณยังเจอ E7 → Am ได้บ่อย เพราะ G♯ ใน E7 พาเสียงขึ้นไปหา A</p>`, lab:'chord' },
  { id:'scales', th:'สเกล', en:'Scales', title:'สเกลสำหรับริฟฟ์และโซโล่', intro:'เลือก root และสูตรสเกล แล้วลองฟังเสียงแต่ละตัว คุณสามารถใช้รูปนิ้วเดิมย้ายคีย์ได้เมื่อย้ายโน้ตทั้งหมดไปเท่ากัน',
    body:`<h2>สเกลพื้นฐานและ pentatonic</h2><p>Major ใช้ระยะเต็ม–เต็ม–ครึ่ง–เต็ม–เต็ม–เต็ม–ครึ่ง ส่วน natural minor มี ♭3, ♭6 และ ♭7 เมื่อเทียบกับ parallel major Pentatonic ใช้ห้าโน้ตและหาเสียงลงจบได้ง่ายเวลาฝึกสร้างวลี</p>
    <h2>Blues, harmonic minor และ melodic minor</h2><p>Minor blues เพิ่ม ♭5 ให้ minor pentatonic ลองใช้เป็นเสียงผ่านระหว่าง 4 กับ 5 ส่วน harmonic minor ยกขั้น 7 ของ natural minor ขึ้นหนึ่งครึ่งเสียง และ melodic minor แบบขาขึ้นยกทั้ง 6 และ 7 ในแจ๊สมักใช้สูตรขาขึ้นทั้งสองทิศทาง</p>
    <h2>ลองออกนอกตำแหน่งเดิม</h2><p>เลือก Hirajoshi เพื่อฟังสีสันจากช่องว่างกว้างของสเกลห้าโน้ต ในแอปใช้สูตร 1–2–♭3–5–♭6 ซึ่งเป็นหนึ่งในสูตรที่เรียกด้วยชื่อนี้ หรือเลือก Mixolydian Pentatonic เพื่อทดลองชุด 1–3–4–5–♭7 เหนือคอร์ด dominant</p>`,
    lab:'scale', preset:'Minor Pentatonic', root:2 },
  { id:'modes', th:'โหมด', en:'Modes', title:'โหมดและโน้ตที่ให้สีสัน', intro:'โหมดเริ่มชัดเมื่อคอร์ดหรือเสียงเบสทำให้เราได้ยินว่าโน้ตไหนเป็นศูนย์กลาง ลองฟังตัวอย่างที่มีเสียง root ค้างอยู่ด้านล่าง',
    body:`<h2>เปลี่ยนศูนย์กลางก่อนฟังโหมด</h2><p>D Dorian ใช้โน้ตชุดเดียวกับ C major ถ้าลองวาง D หรือ Dm เป็นพื้น แล้วเน้น B คุณจะได้ยินเสียงขั้น 6 ของ Dorian เทียบกับ B♭ ใน D natural minor</p>
    <h2 id="colour-notes">โน้ตที่ให้สีสันกับโหมด</h2><p>ลองเทียบ G7 → C ซึ่งพาเสียงกลับ tonic กับ Dm → G ที่วนโดยยึด D เป็นบ้าน กรณีหลังให้ลองย้ำ B เพื่อฟังสี Dorian ตารางนี้ใช้ A เป็น root เดียวกันเพื่อเทียบโหมด</p><div id="mode-table"></div>
    <h2>โหมดจาก harmonic และ melodic minor</h2><p>Phrygian Dominant คือขั้น 5 ของ harmonic minor ส่วน Lydian Dominant และ Mixolydian ♭6 มาจากขั้น 4 และ 5 ของ melodic minor ตามลำดับ ลอง Phrygian Dominant ใน E โดยสลับ F กับ G♯ เหนือสาย E เปล่าที่เล่นเป็น pedal tone</p>`,
    lab:'mode', preset:'Dorian', root:2 }
];

const scales = {
  'Major': ['1 2 3 4 5 6 7',''],
  'Natural Minor': ['1 2 ♭3 4 5 ♭6 ♭7',''],
  'Minor Pentatonic': ['1 ♭3 4 5 ♭7',''],
  'Minor Blues': ['1 ♭3 4 ♭5 5 ♭7','♭5'],
  'Major Pentatonic': ['1 2 3 5 6',''],
  'Mixolydian Pentatonic': ['1 3 4 5 ♭7','♭7'],
  'Harmonic Minor': ['1 2 ♭3 4 5 ♭6 7','7'],
  'Melodic Minor': ['1 2 ♭3 4 5 6 7','6 7'],
  'Hirajoshi': ['1 2 ♭3 5 ♭6',''],
};
const modes = {
  'Ionian': ['1 2 3 4 5 6 7','4'],
  'Dorian': ['1 2 ♭3 4 5 6 ♭7','6'],
  'Phrygian': ['1 ♭2 ♭3 4 5 ♭6 ♭7','♭2'],
  'Lydian': ['1 2 3 ♯4 5 6 7','♯4'],
  'Mixolydian': ['1 2 3 4 5 6 ♭7','♭7'],
  'Aeolian': ['1 2 ♭3 4 5 ♭6 ♭7','♭6'],
  'Locrian': ['1 ♭2 ♭3 4 ♭5 ♭6 ♭7','♭2 ♭5'],
  'Phrygian Dominant': ['1 ♭2 3 4 5 ♭6 ♭7','♭2 3'],
  'Lydian Dominant': ['1 2 3 ♯4 5 6 ♭7','♯4 ♭7'],
  'Mixolydian ♭6': ['1 2 3 4 5 ♭6 ♭7','♭6 ♭7']
};
const chords = {
  'Major': ['1 3 5',''],
  'Minor': ['1 ♭3 5',''],
  'Diminished': ['1 ♭3 ♭5',''],
  'Augmented': ['1 3 ♯5',''],
  'Major 7': ['1 3 5 7',''],
  'Minor 7': ['1 ♭3 5 ♭7',''],
  'Dominant 7': ['1 3 5 ♭7',''],
  'Minor 7♭5': ['1 ♭3 ♭5 ♭7',''],
  'Sus2': ['1 2 5',''],
  'Sus4': ['1 4 5',''],
  'Power chord (5)': ['1 5','']
};
const intervals = {
  'Unison': ['1',''],
  'Minor second': ['1 ♭2',''],
  'Major second': ['1 2',''],
  'Minor third': ['1 ♭3',''],
  'Major third': ['1 3',''],
  'Perfect fourth': ['1 4',''],
  'Augmented fourth': ['1 ♯4',''],
  'Diminished fifth': ['1 ♭5',''],
  'Perfect fifth': ['1 5',''],
  'Augmented fifth': ['1 ♯5',''],
  'Minor sixth': ['1 ♭6',''],
  'Major sixth': ['1 6',''],
  'Minor seventh': ['1 ♭7',''],
  'Major seventh': ['1 7',''],
  'Octave': ['1 8','']
};
